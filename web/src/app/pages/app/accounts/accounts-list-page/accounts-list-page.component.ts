import { Account } from './../../../../models/data/account';
import { AccountService } from './../../../../_services/account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-list-page',
  templateUrl: './accounts-list-page.component.html',
  styleUrls: ['./accounts-list-page.component.scss']
})
export class AccountsListPageComponent implements OnInit {
  public accounts: Account[];
  public isLoading: boolean = false;
  constructor(private accountSerice: AccountService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.accountSerice.getAccounts().subscribe(data => {
      this.isLoading = false;
      this.accounts = data;
    }, (err) => {
      console.log(err);
      this.isLoading = false;
    });
  }

}
