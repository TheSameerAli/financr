import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCategoriesPageComponent } from './account-categories-page.component';

describe('AccountCategoriesPageComponent', () => {
  let component: AccountCategoriesPageComponent;
  let fixture: ComponentFixture<AccountCategoriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCategoriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
