import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransferModalComponent } from './balance-transfer-modal.component';

describe('BalanceTransferModalComponent', () => {
  let component: BalanceTransferModalComponent;
  let fixture: ComponentFixture<BalanceTransferModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceTransferModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTransferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
