import { AccountType } from './../../../models/account';
import { CategoryType, AccountCategory } from './../../../models/accountCategory';
import { AccountService } from './../../../services/account/account.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-categories-page',
  templateUrl: './account-categories-page.component.html',
  styleUrls: ['./account-categories-page.component.scss']
})
export class AccountCategoriesPageComponent implements OnInit {
  public createAccountModalOpen = false;
  public currentCategoryType: string;
  public accountId: string;
  public category = {
    name: ''
  };
  public expenseCategories: AccountCategory[];
  public incomeCategories: AccountCategory[];
  constructor(private route: ActivatedRoute, private accountService: AccountService) {
    this.route.params.subscribe(p => {
      this.accountId = p.id;
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.accountService.getCategories(this.accountId).subscribe((data: AccountCategory[]) => {
      this.expenseCategories = data.filter(d => d.type === CategoryType.Expense);
      this.incomeCategories = data.filter(d => d.type === CategoryType.Income);
    });
  }

  closeModal() {
    this.createAccountModalOpen = false;
  }

  openModal(categoryType: string) {
    this.currentCategoryType = this.titleCase(categoryType);
    this.createAccountModalOpen = true;
  }

  createCategory() {
    let categoryType: CategoryType;
    if (this.currentCategoryType === 'Income') {
      categoryType = CategoryType.Income;
    }
    if (this.currentCategoryType === 'Expense') {
      categoryType = CategoryType.Expense;
    }
    this.accountService.createCategory(this.accountId, this.category.name, categoryType).subscribe(data => {
      this.getCategories();
    });

    this.closeModal();
    this.currentCategoryType = '';
    this.category.name = '';
  }

  deleteCategory(categoryId: string) {
    this.accountService.deleteCategory(this.accountId, categoryId).subscribe(data => {
      this.getCategories();
    });

  }

  titleCase(str) {
    const sentence = str.toLowerCase().split(' ');
    for (let i = 0; i < sentence.length; i++) {
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
  }

}

