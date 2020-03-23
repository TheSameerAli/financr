import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { RecurringTransaction } from 'src/app/models/recurring-transaction';

@Component({
  selector: 'app-recurring-transactions-table',
  templateUrl: './recurring-transactions-table.component.html',
  styleUrls: ['./recurring-transactions-table.component.scss']
})
export class RecurringTransactionsTableComponent implements OnInit, OnChanges {
  @Input() transactions: RecurringTransaction[];
  @Output() deleteTransaction: EventEmitter<string> = new EventEmitter();

  public total = 0;

  constructor() {
    this.calculateTotal();
  }

  ngOnInit() {
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    if (this.transactions) {
      this.transactions.forEach(t => {
        this.total += t.income;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
  }

  deleteRecurringTransaction(recurringTransactionId: string) {
    this.deleteTransaction.emit(recurringTransactionId);
  }

}
