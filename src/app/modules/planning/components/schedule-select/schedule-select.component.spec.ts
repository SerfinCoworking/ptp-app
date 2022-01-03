import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleSelectComponent } from './schedule-select.component';

describe('ScheduleSelectComponent', () => {
  let component: ScheduleSelectComponent;
  let fixture: ComponentFixture<ScheduleSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
