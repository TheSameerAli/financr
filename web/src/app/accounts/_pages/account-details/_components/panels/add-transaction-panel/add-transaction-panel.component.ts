import { Currency } from './../../../../../../shared/_models/currency';
import { CurrencyService } from './../../../../../../shared/_services/currency.service';
import { getUserPreferences } from './../../../../../../shared/store/shared.selector';
import { Observable } from 'rxjs';
import { Account } from './../../../../../_models/account';
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
import { currentlyViewingAccountSelector } from 'src/app/accounts/store/selector/account.selectors';
import { UserPreferences } from 'src/app/settings/_models/user-preferences';

@Component({
  selector: 'app-add-transaction-panel',
  templateUrl: './add-transaction-panel.component.html',
  styleUrls: ['./add-transaction-panel.component.scss']
})
export class AddTransactionPanelComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() isOpen: boolean = false;
  @Input() accountId: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  public currentlyViewingAccount$: Observable<Account>;
  public userPreferences$: Observable<UserPreferences>;

  public accountCategories: AccountCategory[];
  public isAccountCategoriesLoading: boolean = false;

  public isCreateLoading: boolean = false;

  public addTransactionForm: FormGroup;

  public convertedAmount: number = 0;

  public currencyState: {
    main: Currency
    secondary: Currency
  };

  constructor(
    private accountService: AccountService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService) { }

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
    this.currentlyViewingAccount$ = this.store.select(currentlyViewingAccountSelector);
    this.userPreferences$ = this.store.select(getUserPreferences);
    this.isAccountCategoriesLoading = true;
    this.accountService.getAccountCategories(this.accountId).subscribe(data => {
      this.isAccountCategoriesLoading = false;
      this.accountCategories = data;
    }, (err) => {
      this.isAccountCategoriesLoading = false;
    })

    this.currentlyViewingAccount$.subscribe(currentAccount => {
      this.userPreferences$.subscribe(uPreferences => {
        this.currencyState = {
          main: currentAccount.preferences.currencyData,
          secondary: uPreferences.currencyData
        }
      })
    })
  }

  switchCurrencies() {
    this.currencyState = {
      main: this.currencyState.secondary,
      secondary: this.currencyState.main
    }

    this.handleConversion(true);
  }

  selectCategory(accountCategory: AccountCategory) {
    this.addTransactionForm.patchValue({
      selectedCategory: accountCategory
    });
  }



  createTransaction() {
    this.isCreateLoading = true;
    let transactionAmount = this.selectedAmountType.value === 1 ? this.amount.value * -1 : this.amount.value;

    this.currentlyViewingAccount$.subscribe(currentAccount => {

      this.userPreferences$.subscribe(uPreferences => {
        if (this.currencyState.main.code !== currentAccount.preferences.currency) {
          let pair = `${this.currencyState.main.code}_${this.currencyState.secondary.code}`;
          this.currencyService.convert(pair, transactionAmount).subscribe(data => {
            transactionAmount = data;
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

          })
        } else {
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
      })

    })


  }

  selectAmountType(type) {
    this.addTransactionForm.patchValue({
      selectedAmountType: type
    });
  }

  handleConversion(force: boolean = false) {
    let amount = this.amount.value;

    setTimeout(() => {
      if (this.amount.value !== amount || force === true) {
        this.userPreferences$.subscribe(uPreferences => {
          this.currentlyViewingAccount$.subscribe(currentAccount => {
            if (uPreferences.currencyData.code !== currentAccount.preferences.currencyData.code) {
              if (!this.amount.invalid) {
                let pair = `${this.currencyState.main.code}_${this.currencyState.secondary.code}`;
                this.currencyService.convert(pair, this.amount.value).subscribe(data => {
                  this.convertedAmount = data;
                })
              }
            }
          })
        })
      }
    }, 1000)

  }

  closeBox() {
    this.initialiseForm();
    this.close.emit();
  }

  initialiseForm() {
    this.addTransactionForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      transactionDate: [moment(new Date()).format('MM/DD/YYYY'), [Validators.required, Validators.pattern('(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}')]],
      selectedAmountType: [0, [Validators.required]],
      selectedCategory: [undefined, [Validators.required]]
    });
    this.convertedAmount = 0;
  }

}
