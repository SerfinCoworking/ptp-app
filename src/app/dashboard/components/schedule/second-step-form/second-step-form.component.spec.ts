import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStepFormComponent } from './second-step-form.component';

describe('SecondStepFormComponent', () => {
  let component: SecondStepFormComponent;
  let fixture: ComponentFixture<SecondStepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondStepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
