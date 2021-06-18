import { loadCurrentlyViewingAccountRequest, loadCurrentlyViewingAccountTransactionsRequest } from './../../../../../../store/action/account.actions';
import { refreshFinancialHealthRequest } from './../../../../../../../shared/store/shared.actions';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../../../../../../_services/accounts.service';
import { currentlyViewingAccountSelector } from 'src/app/accounts/store/selector/account.selectors';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/accounts/_models/account';

@Component({
  selector: 'app-balance-transfer-modal',
  templateUrl: './balance-transfer-modal.component.html',
  styleUrls: ['./balance-transfer-modal.component.scss']
})
export class BalanceTransferModalComponent implements OnInit {
  @Input('accountId') accountId: string;
  public isTransferHappening: boolean = false;
  public accounts: Account[];

  public transferForm: FormGroup;

  public currentlyViewingAccount$: Observable<Account>;

  constructor(
    private store: Store<AppState>,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { }

  get balance() {
    return this.transferForm.get('balance');
  }

  get toId() {
    return this.transferForm.get('toId');
  }


  ngOnInit(): void {
    this.currentlyViewingAccount$ = this.store.select(currentlyViewingAccountSelector);
    this.getAccounts();
    this.reloadForm();
  }

  reloadBalance() {
    this.currentlyViewingAccount$.subscribe(data => {
      if (data) {
        console.log(data.availableBalance);
        this.transferForm.controls['balance'].setValidators([Validators.max(data.availableBalance)]);
      }
    })
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(accs => {
      this.accounts = accs.filter(a => a.id != this.accountId);
    });

  }

  triggerTransfer() {
    this.isTransferHappening = true;
    if (this.transferForm.valid) {
      this.accountService.transferBalance(this.accountId, this.toId.value, this.balance.value).subscribe(data => {
        this.isTransferHappening = false;
        this.toastr.success('Successfully transferred balance.', 'Success');
        this.store.dispatch(refreshFinancialHealthRequest());
        this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));
        this.closeModal();
        this.reloadForm();
        this.store.dispatch(loadCurrentlyViewingAccountTransactionsRequest({accountId: this.accountId}));

      }, (err) => {
        this.toastr.error('Error transfering balance from this account', 'Error')
      })
    }

  }

  reloadFormFields() {
    this.transferForm = this.formBuilder.group({
      balance: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0.01)]],
      toId: ['', [Validators.required]]
    })
  }

  reloadForm() {
    this.reloadFormFields();
    this.reloadBalance();
  }

  closeModal() {
    const modal = document.getElementById('balance-transfer-modal');
    const backdrop = document.querySelector('.modal-backdrop.fade.show');
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('show');
    modal.classList.remove('show');
    modal.style.display = 'none';
    backdrop.remove();
  }

}
