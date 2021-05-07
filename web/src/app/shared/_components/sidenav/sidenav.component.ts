import { OverviewService } from './../../../dashboard/_services/overview.service';
import { FinancialHealth } from './../../../dashboard/_models/financial-health';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public financialHealth: FinancialHealth;
  public networthLoading = true;
  constructor(private overviewService: OverviewService) { }

  ngOnInit(): void {
    this.networthLoading = true;
    this.overviewService.getFinancialHealth().subscribe(data => {
      this.financialHealth = data;
      this.networthLoading = false;
    }, (err) => {
      console.log(err);
      this.networthLoading = false;
    })
  }

}
