import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransactionPanelComponent } from './view-transaction-panel.component';

describe('ViewTransactionPanelComponent', () => {
  let component: ViewTransactionPanelComponent;
  let fixture: ComponentFixture<ViewTransactionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTransactionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransactionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
