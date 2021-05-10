import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsTransactionsPageComponent } from './account-details-transactions-page.component';

describe('AccountDetailsTransactionsPageComponent', () => {
  let component: AccountDetailsTransactionsPageComponent;
  let fixture: ComponentFixture<AccountDetailsTransactionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsTransactionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsTransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
