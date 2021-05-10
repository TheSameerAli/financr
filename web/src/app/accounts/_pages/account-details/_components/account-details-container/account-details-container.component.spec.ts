import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsContainerComponent } from './account-details-container.component';

describe('AccountDetailsContainerComponent', () => {
  let component: AccountDetailsContainerComponent;
  let fixture: ComponentFixture<AccountDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
