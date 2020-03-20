import { Transaction } from './../../../models/transaction';
import { AccountService } from './../../../services/account/account.service';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-transactions-panel',
  templateUrl: './transactions-panel.component.html',
  styleUrls: ['./transactions-panel.component.scss']
})
export class TransactionsPanelComponent implements OnInit {
  @Input() accountId: string;
  public transactions: Transaction[];
  public displayTransactions: Transaction[];
  public searchTerm: string;
  constructor(private accountService: AccountService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.accountService.getTransactionsByMonth(this.accountId, new Date()).subscribe((data: Transaction[]) => {
      this.transactions = data;
      this.displayTransactions = this.transactions;
    });
  }

  search() {
    if (!this.searchTerm) {
      this.displayTransactions = this.transactions;
      this.cd.detectChanges();
    } else {
      this.displayTransactions =
      this.transactions.filter(t => t.description.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim()));
      this.cd.detectChanges();
    }

  }

}
