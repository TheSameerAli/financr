import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsSettingsPageComponent } from './account-details-settings-page.component';

describe('AccountDetailsSettingsPageComponent', () => {
  let component: AccountDetailsSettingsPageComponent;
  let fixture: ComponentFixture<AccountDetailsSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
