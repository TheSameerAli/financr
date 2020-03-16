import {
  Transaction
} from './../../../models/transaction';
import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-financial-breakdown',
  templateUrl: './financial-breakdown.component.html',
  styleUrls: ['./financial-breakdown.component.scss']
})
export class FinancialBreakdownComponent implements OnInit {
  @Input() monthlyTransactions: Transaction[];
  @Input() allTransactions: Transaction[];
  public incomeCategoryTransactions: CategoryAmount[];
  public expenseCategoryTransactions: CategoryAmount[];
  public closingBalance: number;
  public openingBalance: number;
  constructor() {}

  ngOnInit() {
    this.incomeCategoryTransactions = [];
    this.expenseCategoryTransactions = [];
    this.getCategoryAmounts();
    this.getOpeningBalance();
    this.getClosingBalance();
  }

  getOpeningBalance() {
    this.openingBalance = 0;
    this.allTransactions.forEach(trans => {
      if (new Date(trans.transactionDate).getMonth() < new Date().getMonth()) {
        this.openingBalance += trans.income;
      }
    });
  }

  getClosingBalance() {
    this.closingBalance = this.openingBalance;
    this.monthlyTransactions.forEach(tr => {
      this.closingBalance += tr.income;
    });
  }

  getCategoryAmounts() {
    const incomeTransactions = this.monthlyTransactions.filter(t => t.income > 0);
    const expenseTransactions = this.monthlyTransactions.filter(t => t.income < 0);


    // Get for income
    incomeTransactions.forEach(it => {
      const index = this.incomeCategoryTransactions.findIndex(t => t.categoryName === it.accountCategory.name);
      if (index === -1) {
        this.incomeCategoryTransactions.push({
          categoryName: it.accountCategory.name,
          amount: it.income
        });
      } else {
        this.incomeCategoryTransactions[index].amount += it.income;
      }
    });

    // Get for expenses
    expenseTransactions.forEach(et => {
      console.log(et);
      const index = this.expenseCategoryTransactions.findIndex(t => t.categoryName === et.accountCategory.name);
      if (index === -1) {
        this.expenseCategoryTransactions.push({
          categoryName: et.accountCategory.name,
          amount: et.income
        });
      } else {
        this.expenseCategoryTransactions[index].amount += et.income;
      }
    });
  }

}

export interface CategoryAmount {
  categoryName: string;
  amount: number;
}
