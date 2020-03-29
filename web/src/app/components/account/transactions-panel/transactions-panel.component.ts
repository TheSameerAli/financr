import { RecurringTransaction } from './../../../models/recurring-transaction';
import { Transaction } from './../../../models/transaction';
import { AccountService } from './../../../services/account/account.service';
import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-transactions-panel',
  templateUrl: './transactions-panel.component.html',
  styleUrls: ['./transactions-panel.component.scss']
})
export class TransactionsPanelComponent implements OnInit, OnChanges {
  @Input() accountId?: string;
  @Input() transactions: any;
  @Input() panelTitle: string;
  public displayTransactions: Transaction[] | RecurringTransaction[];
  public searchTerm = '';
  constructor(private accountService: AccountService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.search();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.search();
  }

  search() {
    if (!this.searchTerm || this.searchTerm === '') {
      this.displayTransactions = this.transactions;
      this.cd.detectChanges();
    } else {
      this.displayTransactions =
      this.transactions.filter(t => t.description.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim()));
      this.cd.detectChanges();
    }

  }

}
