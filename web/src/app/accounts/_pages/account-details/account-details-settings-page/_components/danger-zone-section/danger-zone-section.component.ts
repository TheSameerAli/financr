import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../../../../_services/accounts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { currentlyViewingAccountSelector } from './../../../../../store/selector/account.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Account } from 'src/app/accounts/_models/account';

@Component({
  selector: 'app-danger-zone-section',
  templateUrl: './danger-zone-section.component.html',
  styleUrls: ['./danger-zone-section.component.scss']
})
export class DangerZoneSectionComponent implements OnInit {
  @Input('accountId') accountId: string;
  public currentAccount$: Observable<Account>;
  public deleteForm: FormGroup;
  public confirmCode = Math.floor(100000 + Math.random() * 900000);
  constructor(private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentAccount$ = this.store.select(currentlyViewingAccountSelector);
    this.deleteForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('^' + this.confirmCode + '\\s*$')]]
    });

  }

  deleteAccount() {
    if (!this.deleteForm.invalid) {
      this.toastr.warning('Deleting this account', 'Please wait')
      this.accountService.deleteAccount(this.accountId).subscribe(data => {
        this.toastr.success('Account has been successfully deleted.', 'Deleted');
        this.router.navigate(['/accounts']);

      }, (err) => {
        this.toastr.error('Error deleing the account. Please try again later.', 'Error');

      })
    }
  }

}
