import { Router } from '@angular/router';
import { AccountService } from './../../../../_services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-add-account-page',
  templateUrl: './add-account-page.component.html',
  styleUrls: ['./add-account-page.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class AddAccountPageComponent implements OnInit {
  public step: number = 1;
  public accountType: number;
  public isLoading: boolean = false;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  accountSelection(data) {
    this.accountType = data;
    this.step = 2;
  }

  createAccount(data) {
    let balance = data.balance;
    let name = data.name;
    let type = this.accountType;
    this.isLoading = true;
    this.accountService.createAccount(type, name, balance).subscribe(data => {
      this.isLoading = false;
      this.router.navigate(['/accounts']);
    }, (err) => {
      this.isLoading = false;
    })
  }

}
