import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerZoneSectionComponent } from './danger-zone-section.component';

describe('DangerZoneSectionComponent', () => {
  let component: DangerZoneSectionComponent;
  let fixture: ComponentFixture<DangerZoneSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangerZoneSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerZoneSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
