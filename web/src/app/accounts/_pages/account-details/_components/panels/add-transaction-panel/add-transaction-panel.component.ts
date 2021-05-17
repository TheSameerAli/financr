import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { refreshFinancialHealthRequest } from './../../../../../../shared/store/shared.actions';
import { loadCurrentlyViewingAccountTransactionsRequest, loadCurrentlyViewingAccountRequest, loadSpendingChartRequest } from './../../../../../store/action/account.actions';
import { Store } from '@ngrx/store';
import { AccountService } from './../../../../../_services/accounts.service';
import { AccountCategory } from './../../../../../_models/transaction';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import Pikaday from 'pikaday';
import * as moment from 'moment';

@Component({
  selector: 'app-add-transaction-panel',
  templateUrl: './add-transaction-panel.component.html',
  styleUrls: ['./add-transaction-panel.component.scss']
})
export class AddTransactionPanelComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() isOpen: boolean = false;
  @Input() accountId: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  public accountCategories: AccountCategory[];
  public isAccountCategoriesLoading: boolean = false;

  public isCreateLoading: boolean = false;

  public addTransactionForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) { }

  get amount() {
    return this.addTransactionForm.get('amount');
  }

  get description() {
    return this.addTransactionForm.get('description');
  }

  get transactionDate() {
    return this.addTransactionForm.get('transactionDate');
  }

  get selectedAmountType() {
    return this.addTransactionForm.get('selectedAmountType');
  }

  get selectedCategory() {
    return this.addTransactionForm.get('selectedCategory');
  }

  ngOnInit(): void {
    this.initialiseForm();
  }


  ngAfterViewInit(): void {
    var picker = new Pikaday(
      {
        field: document.getElementById('datepicker'),
        trigger: document.getElementById('datepicker'),
        format: 'MM/DD/YYYY',
        onSelect: (ev: Date) => {

          this.addTransactionForm.patchValue({
            transactionDate: moment(ev).format('MM/DD/YYYY'),
          });
        }
      }
      );
      picker.setDate(new Date());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isAccountCategoriesLoading = true;
    this.accountService.getAccountCategories(this.accountId).subscribe(data => {
      this.isAccountCategoriesLoading = false;
      this.accountCategories = data;
    }, (err) => {
      this.isAccountCategoriesLoading = false;
    })
  }

  selectCategory(accountCategory: AccountCategory) {
    this.addTransactionForm.patchValue({
      selectedCategory: accountCategory
    });
    console.log(this.addTransactionForm);
  }



  createTransaction() {
    this.isCreateLoading = true;
    let transactionAmount = this.selectedAmountType.value === 1 ? this.amount.value * -1 : this.amount.value;
    this.accountService.createTransaction(this.accountId, transactionAmount, this.description.value,
      this.selectedCategory.value.id, new Date(Date.parse(this.transactionDate.value))).subscribe(data => {
      this.store.dispatch(loadCurrentlyViewingAccountTransactionsRequest({accountId: this.accountId}));
      this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));
      this.store.dispatch(refreshFinancialHealthRequest());
      this.store.dispatch(loadSpendingChartRequest({accountId: this.accountId}));
      this.isCreateLoading = false;
      this.closeBox();
    }, (err) => {
      this.isCreateLoading = false;
    })
  }

  selectAmountType(type) {
    this.addTransactionForm.patchValue({
      selectedAmountType: type
    });
  }

  closeBox() {
    this.initialiseForm();
    this.close.emit();
  }

  initialiseForm() {
    this.addTransactionForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      transactionDate: [moment(new Date()).format('MM/DD/YYYY'), [Validators.required]],
      selectedAmountType: [0, [Validators.required]],
      selectedCategory: [undefined, [Validators.required]]
    });
  }

}
