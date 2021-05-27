import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLoaderComponent } from './default-loader.component';

describe('DefaultLoaderComponent', () => {
  let component: DefaultLoaderComponent;
  let fixture: ComponentFixture<DefaultLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
