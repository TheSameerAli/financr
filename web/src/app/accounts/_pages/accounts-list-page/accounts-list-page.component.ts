import { Account } from './../../_models/account';
import { AccountService } from './../../_services/accounts.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-list-page',
  templateUrl: './accounts-list-page.component.html',
  styleUrls: ['./accounts-list-page.component.scss']
})
export class AccountsListPageComponent implements OnInit {
  public accounts: Account[];
  public isLoading: boolean = false;
  public accountIcons = {
    0: '/assets/icons/bank.svg',
    1: '/assets/icons/investment.svg',
    2: '/assets/icons/savings.svg',
    3: '/assets/icons/loan.svg'
  }

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.accountService.getAccounts().subscribe(data => {
      this.isLoading = false;
      this.accounts = data;
    }, (err) => {
      console.log(err);
      this.isLoading = false;
    });
  }

  toAccount(id) {
    this.router.navigate(['/accounts', id]);
  }

}
