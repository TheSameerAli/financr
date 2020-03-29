import { Title } from '@angular/platform-browser';
import {
  RecurringTransactionService
} from './../../../services/account/transactions/recurring-transaction.service';
import {
  CategoryType,
  AccountCategory
} from './../../../models/accountCategory';
import {
  RecurringTransaction
} from './../../../models/recurring-transaction';
import {
  AccountService
} from './../../../services/account/account.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  Account
} from 'src/app/models/account';

@Component({
  selector: 'app-recurring-transactions-page',
  templateUrl: './recurring-transactions-page.component.html',
  styleUrls: ['./recurring-transactions-page.component.scss']
})
export class RecurringTransactionsPageComponent implements OnInit {
  public recurringTransactionsTabs = RecurringTransactionsTabs;
  public selectedTab: RecurringTransactionsTabs | any;
  public accountId: string;
  public account: Account;
  public createRecurringTransactionModalOpen = false;
  public currentTransactionType = RecurringTransactionTypes.Income;
  public recurringTransactionTypes = RecurringTransactionTypes;
  public recurringTransaction: RecurringTransaction;

  public incomeCategories: AccountCategory[];
  public expenseCategories: AccountCategory[];

  public recurringTransactions: RecurringTransaction[];
  public displayRecurringTransactions: RecurringTransaction[];

  public isLoading = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private recurringTransactionService: RecurringTransactionService,
    private cd: ChangeDetectorRef,
    private titleService: Title) {
    this.selectedTab = RecurringTransactionsTabs.Income;
    this.recurringTransaction = {
      id: '',
      startDate: new Date(),
      occurrence: 0,
      description: '',
      income: 0,
      accountCategoryId: '',
      accountId: '',
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe(qp => {
      if (qp.selectedTab) {
        const selectedTab = qp.selectedTab;
        this.selectedTab = this.recurringTransactionsTabs[selectedTab];
      }
    });
    this.route.params.subscribe(p => {
      this.accountId = p.id;
    });
    this.getCategories();
    this.getRecurringTransactions();
    this.setTitle();
  }

  setTitle() {
    this.accountService.getAccount(this.accountId).subscribe((data: Account) => {
      this.titleService.setTitle('Recurring Transactions - ' + data.name + ' | Financr');
    });
  }




  changeTab(tab: RecurringTransactionsTabs) {
    this.selectedTab = tab;
    if (this.selectedTab === RecurringTransactionsTabs.Expenses) {
      this.currentTransactionType = RecurringTransactionTypes.Expense;
    }
    if (this.selectedTab === RecurringTransactionsTabs.Income) {
      this.currentTransactionType = RecurringTransactionTypes.Income;
    }
    this.updateTransactionsData();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedTab: RecurringTransactionsTabs[this.selectedTab]
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }



  closeModal() {
    if (this.isLoading) {
      return;
    }
    this.createRecurringTransactionModalOpen = false;
  }

  openModal() {
    this.createRecurringTransactionModalOpen = true;
  }

  getCategories() {
    this.accountService.getCategories(this.accountId).subscribe((data: AccountCategory[]) => {
      this.expenseCategories = data.filter(d => d.type === CategoryType.Expense);
      this.incomeCategories = data.filter(d => d.type === CategoryType.Income);
    });
  }

  getRecurringTransactions() {
    this.recurringTransactionService.getRecurringTransactions(this.accountId).subscribe((transactions: RecurringTransaction[]) => {
      this.recurringTransactions = transactions;
      this.updateTransactionsData();
    });
  }

  updateTransactionsData() {
    if (this.selectedTab === RecurringTransactionsTabs.Expenses) {
      this.displayRecurringTransactions = this.recurringTransactions.filter(rt => rt.income < 0);
    }

    if (this.selectedTab === RecurringTransactionsTabs.Income) {
      this.displayRecurringTransactions = this.recurringTransactions.filter(rt => rt.income > 0);
    }

    this.cd.detectChanges();
  }

  deleteRecurringTransaction(recurringTransactionId: string) {
    this.recurringTransactionService.deleteRecurringTransaction(this.accountId, recurringTransactionId).subscribe(t => {
      this.getRecurringTransactions();
    });
  }

  createRecurringTransaction() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    let income = 0;
    if (this.selectedTab === RecurringTransactionsTabs.Expenses) {
      income = this.recurringTransaction.income * -1;
    } else {
      income = this.recurringTransaction.income;
    }
    this.recurringTransactionService.createRecurringTransaction(this.recurringTransaction.startDate,
      this.recurringTransaction.occurrence,
      this.recurringTransaction.description,
      income,
      this.recurringTransaction.accountCategoryId,
      this.accountId).subscribe(t => {
        this.isLoading = false;
        this.getRecurringTransactions();
        this.closeModal();
        this.clearInput();
      }, (err) => {this.isLoading = false; });
  }

  clearInput() {
    this.recurringTransaction = {
      id: '',
      startDate: new Date(),
      occurrence: 0,
      description: '',
      income: 0,
      accountCategoryId: '',
      accountId: '',
    };
  }
}


export enum RecurringTransactionsTabs {
  Income = 0,
  Expenses = 1
}

export enum RecurringTransactionTypes {
  Income = 0,
    Expense = 1
}
