import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsHomePageComponent } from './reports-home-page.component';

describe('ReportsHomePageComponent', () => {
  let component: ReportsHomePageComponent;
  let fixture: ComponentFixture<ReportsHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
