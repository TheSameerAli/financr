import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerZonePageComponent } from './danger-zone-page.component';

describe('DangerZonePageComponent', () => {
  let component: DangerZonePageComponent;
  let fixture: ComponentFixture<DangerZonePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangerZonePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerZonePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
