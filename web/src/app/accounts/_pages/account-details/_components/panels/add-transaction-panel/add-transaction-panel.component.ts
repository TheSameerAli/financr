import { refreshFinancialHealthRequest } from './../../../../../../shared/store/shared.actions';
import { loadCurrentlyViewingAccountTransactionsRequest, loadCurrentlyViewingAccountRequest } from './../../../../../store/action/account.actions';
import { Store } from '@ngrx/store';
import { AccountService } from './../../../../../_services/accounts.service';
import { AccountCategory } from './../../../../../_models/transaction';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-add-transaction-panel',
  templateUrl: './add-transaction-panel.component.html',
  styleUrls: ['./add-transaction-panel.component.scss']
})
export class AddTransactionPanelComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() accountId: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  public accountCategories: AccountCategory[];
  public isAccountCategoriesLoading: boolean = false;

  public selectedCategory: AccountCategory;


  public today: Date = new Date();

  public isCreateLoading: boolean = false;

  public selectedAmountType: number = 0;

  /// Form data below
  public date: Date = new Date();
  public description: string = '';
  public amount: number;

  constructor(private accountService: AccountService, private store: Store<AppState>) { }

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
    this.selectedCategory = accountCategory;
  }

  ngOnInit(): void {
  }

  createTransaction() {
    this.isCreateLoading = true;
    let transactionAmount = this.selectedAmountType === 1 ? this.amount * -1 : this.amount;
    this.accountService.createTransaction(this.accountId, transactionAmount, this.description, this.selectedCategory.id, this.date).subscribe(data => {
      this.store.dispatch(loadCurrentlyViewingAccountTransactionsRequest({accountId: this.accountId}));
      this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));
      this.store.dispatch(refreshFinancialHealthRequest());
      this.isCreateLoading = false;
      this.closeBox();
    }, (err) => {
      this.isCreateLoading = false;
    })
  }

  selectAmountType(type) {
    this.selectedAmountType = type;
  }

  closeBox() {
    this.selectedCategory = {id: '', name: ''};
    this.selectedAmountType = 0;
    this.amount;
    this.description = '';
    this.close.emit();
  }

}
