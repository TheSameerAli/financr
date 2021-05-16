import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionPanelComponent } from './edit-transaction-panel.component';

describe('EditTransactionPanelComponent', () => {
  let component: EditTransactionPanelComponent;
  let fixture: ComponentFixture<EditTransactionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransactionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransactionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
