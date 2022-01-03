import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThirdStepFormComponent } from './third-step-form.component';

describe('ThirdStepFormComponent', () => {
  let component: ThirdStepFormComponent;
  let fixture: ComponentFixture<ThirdStepFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdStepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
