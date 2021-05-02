import { Component, OnInit } from '@angular/core';
import { FinancialHealth } from './../../../../models/data/financial-health';
import { OverviewDataService } from './../../../../_services/overview-data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public financialHealth: FinancialHealth;
  public networthLoading = true;
  constructor(private overviewDataService: OverviewDataService) { }

  ngOnInit(): void {
    this.networthLoading = true;
    this.overviewDataService.getFinancialHealth().subscribe(data => {
      this.financialHealth = data;
      this.networthLoading = false;
    }, (err) => {
      console.log(err);
      this.networthLoading = false;
    })
  }

}
