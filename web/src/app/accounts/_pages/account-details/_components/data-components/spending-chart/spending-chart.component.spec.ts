import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingChartComponent } from './spending-chart.component';

describe('SpendingChartComponent', () => {
  let component: SpendingChartComponent;
  let fixture: ComponentFixture<SpendingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
