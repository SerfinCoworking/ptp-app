import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalendarInlineComponent } from './calendar-inline.component';

describe('CalendarInlineComponent', () => {
  let component: CalendarInlineComponent;
  let fixture: ComponentFixture<CalendarInlineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
