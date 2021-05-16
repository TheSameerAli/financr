import { loadCurrentlyViewingAccountRequest } from './../../../store/action/account.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-account-details-transactions-page',
  templateUrl: './account-details-transactions-page.component.html',
  styleUrls: ['./account-details-transactions-page.component.scss']
})
export class AccountDetailsTransactionsPageComponent implements OnInit, AfterViewInit {
  public accountId: string;

  public singleTransactionBoxOpen: boolean = false;
  public addTransactionBoxOpen: boolean = false;
  public isEditTransactionPanelOpen: boolean = false;
  public currentSelectedTransactionId: string = '';


  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.accountId = p['id'];
    });

    this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));

  }

  openSingleTransactionBox(transactionId: string) {
    this.singleTransactionBoxOpen = true;
    this.currentSelectedTransactionId = transactionId;
  }

  closeSingleTransactionBox() {
    this.singleTransactionBoxOpen = false;
  }

  closeAddTransactionBox() {
    this.addTransactionBoxOpen = false;
  }

  openAddTransactionBox() {
    this.addTransactionBoxOpen = true;
  }

  openEditTransactionPanel(transactionId: string) {
    console.log(transactionId);
    this.isEditTransactionPanelOpen = true;
    this.currentSelectedTransactionId = transactionId;
  }

  closeEditTransactionPanel() {
    this.isEditTransactionPanelOpen = false;
  }



}
