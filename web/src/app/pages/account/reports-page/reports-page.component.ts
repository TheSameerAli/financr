import { Title } from '@angular/platform-browser';
import { AccountService } from './../../../services/account/account.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {
  public accountId: string;
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private titleService: Title) {
    this.route.params.subscribe(data => {
      this.accountId = data.id;
    });
   }

  ngOnInit() {
    this.setTitle();
  }

  setTitle() {
    this.accountService.getAccount(this.accountId).subscribe((data: Account) => {
      this.titleService.setTitle('Reports - ' + data.name + ' | Financr');
    });
  }


}
