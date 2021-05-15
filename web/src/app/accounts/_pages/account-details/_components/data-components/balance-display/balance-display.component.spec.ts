import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDisplayComponent } from './balance-display.component';

describe('BalanceDisplayComponent', () => {
  let component: BalanceDisplayComponent;
  let fixture: ComponentFixture<BalanceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
