import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringTransactionsPageComponent } from './recurring-transactions-page.component';

describe('RecurringTransactionsPageComponent', () => {
  let component: RecurringTransactionsPageComponent;
  let fixture: ComponentFixture<RecurringTransactionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurringTransactionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringTransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
