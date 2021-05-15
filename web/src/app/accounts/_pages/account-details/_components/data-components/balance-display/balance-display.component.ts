import { Account } from './../../../../../_models/account';
import { AccountService } from './../../../../../_services/accounts.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-display',
  templateUrl: './balance-display.component.html',
  styleUrls: ['./balance-display.component.scss']
})
export class BalanceDisplayComponent implements OnInit {
  @Input() accountId: string;
  public isLoading: boolean = false;
  public account: Account;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.accountService.getAccount(this.accountId).subscribe((data: Account) => {
      this.isLoading = false;
      this.account = data;
    }, (err) => {
      this.isLoading = false;
    });
  }

}
