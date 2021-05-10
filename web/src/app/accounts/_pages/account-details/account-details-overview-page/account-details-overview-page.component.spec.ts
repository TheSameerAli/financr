import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsOverviewPageComponent } from './account-details-overview-page.component';

describe('AccountDetailsOverviewPageComponent', () => {
  let component: AccountDetailsOverviewPageComponent;
  let fixture: ComponentFixture<AccountDetailsOverviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsOverviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
