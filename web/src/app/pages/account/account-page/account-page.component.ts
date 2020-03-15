import { AccountType } from './../../../models/account';
import { Transaction } from './../../../models/transaction';
import { AccountService } from './../../../services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  public account: Account;
  public accountId: string;
  public currentDate: Date;
  public transactions: Transaction[];
  public monthlyTotal: number;
  public accountType = AccountType;
  public budget;
  public allTransactions: Transaction[];
  constructor(private route: ActivatedRoute, private accountService: AccountService) {
    route.params.subscribe(p => {
      this.accountId = p.id;
      this.ngOnInit();
    });
    this.currentDate = new Date();
    this.budget = {
      total: 0,
      available: 0,
      spent: 0
    };
  }

  ngOnInit() {
    this.getAccount();
    this.getTransactions();
    this.getAllTransactions();
  }

  getAccount() {
    this.accountService.getAccount(this.accountId).subscribe((data: Account) => {
      this.account = data;
      this.budget.total = this.account.budget.budget;
    });
  }

  getTransactions() {
    this.accountService.getTransactionsByMonth(this.accountId, new Date()).subscribe((data: Transaction[]) => {
      this.transactions = data;
      this.budget.spent = 0;
      this.transactions.forEach(trans => {
        if (trans.income < 0) {
          this.budget.spent += trans.income * -1;
        }
      });
      this.budget.available = this.budget.total - this.budget.spent;
    });
  }

  getAllTransactions() {
    this.accountService.getTransactions(this.accountId).subscribe((data: Transaction[]) => {
      this.allTransactions = data;
    });
  }

}
