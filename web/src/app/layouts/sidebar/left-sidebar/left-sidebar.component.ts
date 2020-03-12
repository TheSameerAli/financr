import { FinancialHealth } from './../../../models/financial-health';
import { FinancialHealthService } from './../../../services/overview/financial-health.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  public financialHeath: FinancialHealth;
  constructor(private financialHealthService: FinancialHealthService) { }

  ngOnInit() {
    this.getFinancialHealth();
  }

  getFinancialHealth() {
    this.financialHealthService.getFinancialHealth().subscribe((data: FinancialHealth) => {
      this.financialHeath = data;
    });
  }

}
