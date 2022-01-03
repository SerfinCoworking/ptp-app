import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FourthStepFormComponent } from './fourth-step-form.component';

describe('FourthStepFormComponent', () => {
  let component: FourthStepFormComponent;
  let fixture: ComponentFixture<FourthStepFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FourthStepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
