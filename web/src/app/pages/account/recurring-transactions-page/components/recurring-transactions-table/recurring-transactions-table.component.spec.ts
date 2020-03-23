import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringTransactionsTableComponent } from './recurring-transactions-table.component';

describe('RecurringTransactionsTableComponent', () => {
  let component: RecurringTransactionsTableComponent;
  let fixture: ComponentFixture<RecurringTransactionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurringTransactionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringTransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
