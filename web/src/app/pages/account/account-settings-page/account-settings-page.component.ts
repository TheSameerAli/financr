import { AccountService } from './../../../services/account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.scss']
})
export class AccountSettingsPageComponent implements OnInit {
  public accountSettingsTabs = AccountSettingsTabs;
  public selectedTab: AccountSettingsTabs | any;
  public accountId: string;
  public account: Account;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
    this.selectedTab = AccountSettingsTabs.General;
  }

  ngOnInit() {
    
    this.route.queryParams.subscribe(qp => {
      if (qp.selectedTab) {
        const selectedTab = qp.selectedTab;
        this.selectedTab = this.accountSettingsTabs[selectedTab];
      }
    });
    this.route.params.subscribe(p => {
      this.accountId = p.id;
      this.getAccount();
    });
  }


  getAccount() {
    this.accountService.getAccount(this.accountId).subscribe((data: Account) => {
      this.account = data;
      if (!this.account.budget) {
        this.account.budget = {budget: 0, accountId: this.accountId};
      }
    });
  }

  saveBudget() {
    this.accountService.setBudget(this.account.budget.budget, this.accountId).subscribe(data => {
      console.log('Budget has been saved');
    });
  }


  changeTab(tab: AccountSettingsTabs) {
    this.selectedTab = tab;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedTab: AccountSettingsTabs[this.selectedTab]
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
   }
}


export enum AccountSettingsTabs {
  General = 0,
  Financial = 1
}
