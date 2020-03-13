import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageMenuComponent } from './account-page-menu.component';

describe('AccountPageMenuComponent', () => {
  let component: AccountPageMenuComponent;
  let fixture: ComponentFixture<AccountPageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
