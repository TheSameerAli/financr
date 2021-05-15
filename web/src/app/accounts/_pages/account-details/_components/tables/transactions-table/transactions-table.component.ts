import { Transaction } from './../../../../../_models/transaction';
import { AccountService } from './../../../../../_services/accounts.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() accountId: string;
  @Output() selection: EventEmitter<string> = new EventEmitter();
  public isLoading: boolean = false;
  public transactions: Transaction[];
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.accountService.getTransactions(this.accountId).subscribe(data => {
      this.transactions = data;
      this.isLoading = false;

    }, (err) => {
      this.isLoading = false;
    });
  }

  selectTransaction(transactionId) {
    this.selection.emit(transactionId);
  }

}
