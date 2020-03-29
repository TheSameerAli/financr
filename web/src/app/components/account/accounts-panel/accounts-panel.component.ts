import { Router } from '@angular/router';
import {
  AccountService
} from './../../../services/account/account.service';
import {
  CreateAccountRequest,
  AccountType,
  Account
} from './../../../models/account';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

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
  public displayAccounts: Account[];
  public selectedAccount: SelectableAccounts;
  public selectableAccounts = SelectableAccounts;

  public searchTerm = '';

  constructor(private accountService: AccountService, private cd: ChangeDetectorRef, private router: Router) {
    this.clearForm();
    this.accounts = [];
    this.getAccounts();
    this.selectedAccount = SelectableAccounts.All;
  }

  ngOnInit() {}

  createAccount() {
    this.accountService.createAccount(this.account).subscribe((data: Account) => {
      this.getAccounts();
      this.closeModal();
      this.clearForm();
    });
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe((data: Account[]) => {
      this.accounts = data;
      this.updateDisplayAccounts();
      this.cd.detectChanges();
    });
  }

  closeModal() {
    this.createAccountModalOpen = false;
  }

  openModal() {
    this.createAccountModalOpen = true;
  }

  changeSelectedAccountType(accountType: SelectableAccounts) {
    this.selectedAccount = accountType;
    this.updateDisplayAccounts();
  }

  updateDisplayAccounts() {
    switch (this.selectedAccount) {
      case SelectableAccounts.All: {
        this.displayAccounts = this.accounts;
        break;
      }
      case SelectableAccounts.Current: {
        this.displayAccounts = this.accounts.filter(a => a.type === AccountType.Current);
        break;
      }
      case SelectableAccounts.Savings: {
        this.displayAccounts = this.accounts.filter(a => a.type === AccountType.Savings);
        break;
      }
      case SelectableAccounts.CreditCard: {
        this.displayAccounts = this.accounts.filter(a => a.type === AccountType.CreditCard);
        break;
      }
      case SelectableAccounts.Business: {
        this.displayAccounts = this.accounts.filter(a => a.type === AccountType.Business);
        break;
      }
    }
  }

  search() {
    this.selectedAccount = SelectableAccounts.All;
    if (!this.searchTerm) {
      this.updateDisplayAccounts();
      this.cd.detectChanges();
    } else {
      this.displayAccounts = this.accounts.filter(a => a.name.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim()));
      this.cd.detectChanges();
    }

  }

  clearForm() {
    this.account = {
      name: '',
      type: AccountType.Current,
      initialAmount: 0
    };
  }

  navigate(route: any[]) {
    this.router.navigate(route);
  }
}


export enum SelectableAccounts {
  All = 0,
  Current = 1,
  Business = 2,
  Savings = 3,
  CreditCard = 4
}
