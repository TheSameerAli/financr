import { Title } from '@angular/platform-browser';
import { AccountCategory, CategoryType } from './../../../models/accountCategory';
import { AccountService } from './../../../services/account/account.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from './../../../models/transaction';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as bulmaCalendar from 'bulma-calendar';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})
export class TransactionsPageComponent implements OnInit {
  public selectedMonth: Date;
  public displayMonth: string;
  public createTransactionModalOpen = false;
  public transaction: Transaction;
  public currentTransactionType: string;
  public accountId: string;
  public transactions: Transaction[];
  public total: number;


  public expenseCategories: AccountCategory[];
  public incomeCategories: AccountCategory[];

  public isLoading = false;

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private titleService: Title) {
    this.selectedMonth = new Date();
    this.updateDisplayDate();
    this.resetTransactionData();
    route.params.subscribe(p => {
      this.accountId = p.id;
    });
    this.total = 0;
  }

  setTitle() {
    this.accountService.getAccount(this.accountId).subscribe((data: Account) => {
      this.titleService.setTitle('Transactions - ' + data.name + ' | Financr');
    });
  }

  ngOnInit() {
    this.getTransactions();
    this.getCategories();
    this.setTitle();
  }

  previousMonth() {
    this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1);
    this.getTransactions();
    this.updateDisplayDate();
  }

  nextMonth() {
    this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1);
    this.getTransactions();
    this.updateDisplayDate();

  }

  updateDisplayDate() {
    this.displayMonth = this.datePipe.transform(this.selectedMonth, 'MMMM yyyy');
  }

  openTransactionCreator(type: string) {
    this.currentTransactionType = type;
    this.openModal();
  }

  getTransactions() {
    this.accountService.getTransactionsByMonth(this.accountId, this.selectedMonth).subscribe((data: Transaction[]) => {
      this.transactions = data;
      this.calculateTotal();
    });
  }

  getCategories() {
    this.accountService.getCategories(this.accountId).subscribe((data: AccountCategory[]) => {
      this.expenseCategories = data.filter(d => d.type === CategoryType.Expense);
      this.incomeCategories = data.filter(d => d.type === CategoryType.Income);
    });
  }

  createTransaction() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    if (this.transaction.description === '' || !this.transaction.income || !this.transaction.transactionDate) {
      this.isLoading = false;
      return;
    }
    let income = 0;
    if (this.currentTransactionType === 'Expense') {
      income = this.transaction.income * -1;
    } else {
      income = this.transaction.income;
    }
    this.accountService.createTransation(
      this.transaction.description,
      this.transaction.transactionDate,
      income,
      this.transaction.accountCategoryId,
      this.accountId).subscribe((data: Transaction) => {
        this.isLoading = false;
        this.accountService.transactionEvent.emit();
        this.getTransactions();
        this.closeModal();
        this.resetTransactionData();
      }, (err) => { this.isLoading = false; });
  }

  resetTransactionData() {
    this.transaction = {
      id: '',
      description: '',
      income: 0.00,
      transactionDate: new Date(),
      accountCategoryId: ''
    };
  }

  calculateTotal() {
    this.total = 0;
    this.transactions.forEach(transaction => {
      this.total += transaction.income;
    });
  }

  closeModal() {
    if (this.isLoading) {
      return;
    }
    this.createTransactionModalOpen = false;
  }

  openModal() {
    this.createTransactionModalOpen = true;
  }

}
