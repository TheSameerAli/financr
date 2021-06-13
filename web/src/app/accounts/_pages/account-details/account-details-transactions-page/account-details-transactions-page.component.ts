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
  public currentSelectedTransactionId: string = '';

  public isEditing = false;


  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.accountId = p['id'];
    });



  }

  openSingleTransactionBox(transactionId: string) {
    this.singleTransactionBoxOpen = true;
    this.currentSelectedTransactionId = transactionId;
  }

  closeSingleTransactionBox() {
    this.singleTransactionBoxOpen = false;
    this.currentSelectedTransactionId = ''
    this.isEditing = false;
  }

  closeAddTransactionBox() {
    this.addTransactionBoxOpen = false;
    this.currentSelectedTransactionId = ''
    this.isEditing = false;
  }

  openAddTransactionBox() {
    this.isEditing = false;
    this.addTransactionBoxOpen = true;
    this.currentSelectedTransactionId = '';
  }

  openEditTransactionPanel(transactionId: string) {
    this.addTransactionBoxOpen = true;
    this.currentSelectedTransactionId = transactionId;
    this.isEditing = true;
  }

  closeEditTransactionPanel() {
    this.addTransactionBoxOpen = false;
    this.isEditing = false;
    this.currentSelectedTransactionId = '';
  }



}
