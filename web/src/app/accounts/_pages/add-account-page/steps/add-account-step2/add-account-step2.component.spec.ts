import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountStep2Component } from './add-account-step2.component';

describe('AddAccountStep2Component', () => {
  let component: AddAccountStep2Component;
  let fixture: ComponentFixture<AddAccountStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
