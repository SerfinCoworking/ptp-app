import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeSelectionComponent } from './time-selection.component';

describe('TimeSelectionComponent', () => {
  let component: TimeSelectionComponent;
  let fixture: ComponentFixture<TimeSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
