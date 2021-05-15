import { AccountService } from './../../../../../_services/accounts.service';
import { Transaction } from './../../../../../_models/transaction';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-transaction-panel',
  templateUrl: './view-transaction-panel.component.html',
  styleUrls: ['./view-transaction-panel.component.scss']
})
export class ViewTransactionPanelComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  public transaction: Transaction;
  @Input() transactionId: string;
  @Input() accountId: string;
  @Output() close: EventEmitter<any> = new EventEmitter();
  public isLoading: boolean = false;
  constructor(private accountService: AccountService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadTransaction(this.transactionId);
  }

  loadTransaction(transactionId: string) {
    this.isLoading = true;
    this.accountService.getTransaction(this.accountId, transactionId).subscribe(data => {
      this.isLoading = false;
      this.transaction = data;
    }, (err) => {
      this.isLoading = false;
    })
  }

  closePanel() {
    this.transaction = undefined;
    this.close.emit();
  }

  ngOnInit(): void {
  }

}
