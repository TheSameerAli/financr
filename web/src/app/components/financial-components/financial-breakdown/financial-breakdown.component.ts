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
  @Input() transactions: Transaction[];
  public incomeCategoryTransactions: CategoryAmount[];
  public expenseCategoryTransactions: CategoryAmount[];
  public monthlyTotal: number;
  constructor() {}

  ngOnInit() {
    this.monthlyTotal = 0;
    this.transactions.forEach(tr => {
      this.monthlyTotal += tr.income;
    });
    this.incomeCategoryTransactions = [];
    this.expenseCategoryTransactions = [];
    this.getCategoryAmounts();
  }

  getCategoryAmounts() {
    const incomeTransactions = this.transactions.filter(t => t.income > 0);
    const expenseTransactions = this.transactions.filter(t => t.income < 0);


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

    console.log('dd')


  }

}

export interface CategoryAmount {
  categoryName: string;
  amount: number;
}