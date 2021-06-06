import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesManagementSectionComponent } from './preferences-management-section.component';

describe('PreferencesManagementSectionComponent', () => {
  let component: PreferencesManagementSectionComponent;
  let fixture: ComponentFixture<PreferencesManagementSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesManagementSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesManagementSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
