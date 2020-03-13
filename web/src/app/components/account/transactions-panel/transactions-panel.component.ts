import { Transaction } from './../../../models/transaction';
import { AccountService } from './../../../services/account/account.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transactions-panel',
  templateUrl: './transactions-panel.component.html',
  styleUrls: ['./transactions-panel.component.scss']
})
export class TransactionsPanelComponent implements OnInit {
  @Input() accountId: string;
  public transactions: Transaction[];
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.accountService.getTransactionsByMonth(this.accountId, new Date()).subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

}
