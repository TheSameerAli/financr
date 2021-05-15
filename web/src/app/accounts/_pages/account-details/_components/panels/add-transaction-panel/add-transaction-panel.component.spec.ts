import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionPanelComponent } from './add-transaction-panel.component';

describe('AddTransactionPanelComponent', () => {
  let component: AddTransactionPanelComponent;
  let fixture: ComponentFixture<AddTransactionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
