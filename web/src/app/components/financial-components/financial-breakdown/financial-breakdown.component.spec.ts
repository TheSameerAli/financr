import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBreakdownComponent } from './financial-breakdown.component';

describe('FinancialBreakdownComponent', () => {
  let component: FinancialBreakdownComponent;
  let fixture: ComponentFixture<FinancialBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
