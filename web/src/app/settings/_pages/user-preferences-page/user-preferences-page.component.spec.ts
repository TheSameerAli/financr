import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreferencesPageComponent } from './user-preferences-page.component';

describe('UserPreferencesPageComponent', () => {
  let component: UserPreferencesPageComponent;
  let fixture: ComponentFixture<UserPreferencesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPreferencesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreferencesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
