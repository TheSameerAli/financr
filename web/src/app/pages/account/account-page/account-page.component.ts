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
  constructor(private route: ActivatedRoute, private accountService: AccountService) {
    route.params.subscribe(p => {
      this.accountId = p.id;
      this.ngOnInit();
    });
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.getAccount();
    this.getTransactions();
  }

  getAccount() {
    this.accountService.getAccount(this.accountId).subscribe((data: Account) => {
      this.account = data;
    });
  }

  getTransactions() {
    this.accountService.getTransactionsByMonth(this.accountId, new Date()).subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

}
