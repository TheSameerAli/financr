import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebModalComponent } from './web-modal.component';

describe('WebModalComponent', () => {
  let component: WebModalComponent;
  let fixture: ComponentFixture<WebModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
