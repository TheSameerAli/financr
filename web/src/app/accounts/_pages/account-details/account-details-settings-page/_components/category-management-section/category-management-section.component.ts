import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountCategory } from './../../../../../_models/transaction';
import { AccountService } from './../../../../../_services/accounts.service';
import { Observable } from 'rxjs';
import { currentlyViewingAccountSelector } from './../../../../../store/selector/account.selectors';
import { Account } from './../../../../../_models/account';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-category-management-section',
  templateUrl: './category-management-section.component.html',
  styleUrls: ['./category-management-section.component.scss']
})
export class CategoryManagementSectionComponent implements OnInit {
  @Input('accountId') accountId: string;
  public categories: AccountCategory[];
  public isLoading: Boolean = false;
  public addSelectedCategoryType: number = 0;
  public addCategoryForm: FormGroup;
  public editCategoryForm: FormGroup;
  constructor(private store: Store<AppState>,
    private accountService: AccountService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCategories();
    this.addCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.editCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      id: ['']
    })
  }

  get addName() {
    return this.addCategoryForm.get('name');
  }

  get editName() {
    return this.editCategoryForm.get('name');
  }

  getCategories() {
    this.isLoading = true;
    this.accountService.getAccountCategories(this.accountId).subscribe((data: AccountCategory[]) => {
      this.isLoading = false;
      this.categories = data;
    }, (err) => {
      this.isLoading = false;
    })

  }

  addCategory() {
    let type = this.addSelectedCategoryType;
    let name = this.addName.value;
    if (!this.addCategoryForm.invalid) {
      this.accountService.createAccountCategory(name, type, this.accountId).subscribe(data => {
        this.getCategories();
      }, (err) => {
        console.log('error creating a category');
      })
    }

  }

  editCategory() {
    let categoryId = this.editCategoryForm.get('id').value;
    let name = this.editCategoryForm.get('name').value;
    this.accountService.editAccountCategory(name, categoryId, this.accountId).subscribe(data => {
      this.getCategories();
    }, (err) => {
      console.log('error editing category');
    })
  }

  selectEditCategory(id: string) {
    let category = this.categories.find(c => c.id === id);
    this.editCategoryForm.setValue({name: category.name, id: category.id});
  }

}
