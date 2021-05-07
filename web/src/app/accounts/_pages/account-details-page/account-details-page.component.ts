import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details-page',
  templateUrl: './account-details-page.component.html',
  styleUrls: ['./account-details-page.component.scss']
})
export class AccountDetailsPageComponent implements OnInit {
  public accountId: string;
  public isLoading: boolean = false;
  constructor(private route: ActivatedRoute) {
    route.params.subscribe(p => {
      this.accountId = p['id'];
    });
  }

  ngOnInit(): void {
  }

}
