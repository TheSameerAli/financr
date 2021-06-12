import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { loadSpendingChartRequest } from './../../../../../store/action/account.actions';
import { Transaction } from './../../../../../_models/transaction';
import { refreshFinancialHealthRequest } from '../../../../../../shared/store/shared.actions';
import { loadCurrentlyViewingAccountTransactionsRequest, loadCurrentlyViewingAccountRequest } from '../../../../../store/action/account.actions';
import { Store } from '@ngrx/store';
import { AccountService } from '../../../../../_services/accounts.service';
import { AccountCategory } from '../../../../../_models/transaction';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import Pikaday from 'pikaday';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-transaction-panel',
  templateUrl: './edit-transaction-panel.component.html',
  styleUrls: ['./edit-transaction-panel.component.scss']
})
export class EditTransactionPanelComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() isOpen: boolean = false;
  @Input() accountId: string;
  @Input() transactionId: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  public accountCategories: AccountCategory[];
  public isAccountCategoriesLoading: boolean = false;

  public today: Date = new Date();
  public isEditLoading: boolean = false;

  public transaction: Transaction;


  public isLoading: boolean = false;

  public editTransactionForm: FormGroup;

  picker;

  get amount() {
    return this.editTransactionForm.get('amount');
  }

  get description() {
    return this.editTransactionForm.get('description');
  }

  get transactionDate() {
    return this.editTransactionForm.get('transactionDate');
  }

  get selectedAmountType() {
    return this.editTransactionForm.get('selectedAmountType');
  }

  get selectedCategory() {
    return this.editTransactionForm.get('selectedCategory');
  }

  constructor(
    private accountService: AccountService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) { }



  ngAfterViewInit(): void {
    this.picker = new Pikaday(
      {
        field: document.getElementById('datepicker-' + this.transactionId),
        trigger: document.getElementById('datepicker-' + this.transactionId),
        format: 'MM/DD/YYYY',
        onSelect: (ev: Date) => {

          this.editTransactionForm.patchValue({
            transactionDate: moment(ev).format('MM/DD/YYYY')
          })
        }
      }
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editTransactionForm = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      transactionDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}')]],
      selectedAmountType: ['', [Validators.required]],
      selectedCategory: ['', [Validators.required]]
    });
    this.isLoading = true;
    this.accountService.getAccountCategories(this.accountId).subscribe(data => {
      this.accountCategories = data;
    }, (err) => {
    })
    this.accountService.getTransaction(this.accountId, this.transactionId).subscribe(data => {
      this.isLoading = false;
      this.transaction = data;
      this.initialiseForm();
    }, (err) => {
      this.isLoading = false;
    })
  }

  selectCategory(accountCategory: AccountCategory) {
    this.editTransactionForm.patchValue({
      selectedCategory: accountCategory
    })
  }

  ngOnInit(): void {
  }

  editTransaction() {
    this.isEditLoading = true;
    let transactionAmount = this.selectedAmountType.value === 1 ?  this.amount.value * -1 : this.amount.value;
    this.accountService.editTransaction(this.accountId, this.transactionId, transactionAmount, this.description.value, this.selectedCategory.value.id, new Date(Date.parse(this.transactionDate.value))).subscribe(data => {
      this.store.dispatch(loadCurrentlyViewingAccountTransactionsRequest({accountId: this.accountId}));
      this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));
      this.store.dispatch(refreshFinancialHealthRequest());
      this.store.dispatch(loadSpendingChartRequest({accountId: this.accountId}));
      this.isEditLoading = false;
      this.closeBox();
    }, (err) => {
      this.isEditLoading = false;
    })
  }

  selectAmountType(type) {
    this.editTransactionForm.patchValue({
      selectedAmountType: type
    });
  }

  closeBox() {
    this.close.emit();
  }

  initialiseForm() {
    let amount = 0;
    let selectedAmountType = 0;
    if (this.transaction.amount < 0) {
      selectedAmountType = 1;
      amount = this.transaction.amount * -1;
    } else if (this.transaction.amount > 0) {
      selectedAmountType = 0;
      amount = this.transaction.amount;
    }
    let transactionDate = moment(this.transaction.transactionDate).format('MM/DD/YYYY');
    this.picker.setDate(new Date(Date.parse(this.transactionDate.value)));
    this.editTransactionForm = this.formBuilder.group({
      amount: [amount, [Validators.required, Validators.min(0.01)]],
      description: [this.transaction.description, [Validators.required, Validators.minLength(2)]],
      transactionDate: [transactionDate, [Validators.required, Validators.pattern('(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}')]],
      selectedAmountType: [selectedAmountType, [Validators.required]],
      selectedCategory: [this.transaction.accountCategory, [Validators.required]]
    });
  }

}
