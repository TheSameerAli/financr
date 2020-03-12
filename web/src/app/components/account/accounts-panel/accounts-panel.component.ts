import { AccountService } from './../../../services/account/account.service';
import { CreateAccountRequest, AccountType, Account } from './../../../models/account';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-panel',
  templateUrl: './accounts-panel.component.html',
  styleUrls: ['./accounts-panel.component.scss']
})
export class AccountsPanelComponent implements OnInit {
  public createAccountModalOpen = false;
  public account: CreateAccountRequest;
  public accountType = AccountType;
  public accounts: Account[];
  constructor(private accountService: AccountService) {
    this.account = {
      name: '',
      type: AccountType.Current,
      initialAmount: 0
    };
    this.accounts = [];
    this.getAccounts();
  }

  ngOnInit() {
  }

  createAccount() {
    this.accountService.createAccount(this.account).subscribe((data: Account)  => {
      this.accounts.push(data);
      this.closeModal();
    });
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe((data: Account[]) => {
      this.accounts = data;
    });
  }

  closeModal() {
    this.createAccountModalOpen = false;
  }

  openModal() {
    this.createAccountModalOpen = true;
  }

}
