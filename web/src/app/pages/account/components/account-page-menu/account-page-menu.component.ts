import { AccountService } from './../../../../services/account/account.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-page-menu',
  templateUrl: './account-page-menu.component.html',
  styleUrls: ['./account-page-menu.component.scss']
})
export class AccountPageMenuComponent implements OnInit {
  public accountId: string;
  constructor(private route: ActivatedRoute, private accountService: AccountService) {
    route.params.subscribe(p => {
      this.accountId = p.id;
    });
   }

  ngOnInit() {
  }

}
