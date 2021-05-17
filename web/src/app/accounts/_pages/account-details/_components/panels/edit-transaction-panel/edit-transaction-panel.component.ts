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

  public selectedCategory: AccountCategory;
  public today: Date = new Date();
  public isEditLoading: boolean = false;
  public selectedAmountType: number = 0;

  public transaction: Transaction;


  public isLoading: boolean = false;


  /// Form data below
  public transactionDate: string;
  public description: string = '';
  public amount: number;

  picker;

  constructor(private accountService: AccountService, private store: Store<AppState>) { }

  ngAfterViewInit(): void {
    this.picker = new Pikaday(
      {
        field: document.getElementById('datepicker-' + this.transactionId),
        trigger: document.getElementById('datepicker-' + this.transactionId),
        format: 'MM/DD/YYYY',
        onSelect: (ev: Date) => {

          this.transactionDate = moment(ev).format('MM/DD/YYYY');
        }
      }
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
    this.accountService.getAccountCategories(this.accountId).subscribe(data => {
      this.accountCategories = data;
    }, (err) => {
    })
    this.accountService.getTransaction(this.accountId, this.transactionId).subscribe(data => {
      // Check income or expense
      if (data.amount < 0) {
        this.selectedAmountType = 1;
        this.amount = data.amount * -1;
      } else if (data.amount > 0) {
        this.selectedAmountType = 0;
        this.amount = data.amount;
      }
      // check the selected category
      this.transactionDate = moment(data.transactionDate).format('MM/DD/YYYY');
      this.picker.setDate(new Date(Date.parse(this.transactionDate)));
      this.selectedCategory = data.accountCategory;
      this.description = data.description;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })
  }

  selectCategory(accountCategory: AccountCategory) {
    this.selectedCategory = accountCategory;
  }

  ngOnInit(): void {
  }

  editTransaction() {
    this.isEditLoading = true;
    let transactionAmount = this.selectedAmountType === 1 ? this.amount * -1 : this.amount;
    this.accountService.editTransaction(this.accountId, this.transactionId, transactionAmount, this.description, this.selectedCategory.id, new Date(Date.parse(this.transactionDate))).subscribe(data => {
      this.store.dispatch(loadCurrentlyViewingAccountTransactionsRequest({accountId: this.accountId}));
      this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));
      this.store.dispatch(refreshFinancialHealthRequest());
      this.isEditLoading = false;
      this.closeBox();
    }, (err) => {
      this.isEditLoading = false;
    })
  }

  selectAmountType(type) {
    this.selectedAmountType = type;
  }

  closeBox() {
    this.selectedCategory = {id: '', name: '', type: 0};
    this.selectedAmountType = 0;
    this.amount;
    this.description = '';
    this.transactionDate;
    this.close.emit();
  }

}
