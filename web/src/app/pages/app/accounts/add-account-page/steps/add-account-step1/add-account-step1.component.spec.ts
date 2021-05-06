import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountStep1Component } from './add-account-step1.component';

describe('AddAccountStep1Component', () => {
  let component: AddAccountStep1Component;
  let fixture: ComponentFixture<AddAccountStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
