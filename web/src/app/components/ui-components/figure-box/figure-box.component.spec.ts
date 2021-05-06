import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureBoxComponent } from './figure-box.component';

describe('FigureBoxComponent', () => {
  let component: FigureBoxComponent;
  let fixture: ComponentFixture<FigureBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigureBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigureBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
