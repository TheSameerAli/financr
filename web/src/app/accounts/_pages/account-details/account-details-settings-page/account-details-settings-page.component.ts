import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details-settings-page',
  templateUrl: './account-details-settings-page.component.html',
  styleUrls: ['./account-details-settings-page.component.scss']
})
export class AccountDetailsSettingsPageComponent implements OnInit {
  public accountId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.accountId = data['id'];
    })
  }

}
