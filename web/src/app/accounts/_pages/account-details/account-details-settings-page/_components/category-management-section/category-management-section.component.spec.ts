import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagementSectionComponent } from './category-management-section.component';

describe('CategoryManagementSectionComponent', () => {
  let component: CategoryManagementSectionComponent;
  let fixture: ComponentFixture<CategoryManagementSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryManagementSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManagementSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
