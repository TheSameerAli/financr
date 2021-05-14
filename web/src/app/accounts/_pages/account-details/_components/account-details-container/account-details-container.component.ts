import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details-container',
  templateUrl: './account-details-container.component.html',
  styleUrls: ['./account-details-container.component.scss']
})
export class AccountDetailsContainerComponent implements OnInit {
  public accountId: string;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(p => {
      this.accountId = p['id'];
    })
  }

  ngOnInit(): void {
  }

}
