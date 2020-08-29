import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICalendarBuilder, IShift, IEvent } from '@interfaces/schedule';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { expandEventDay, displayEventCount } from '@shared/animations/calendar.animations';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  animations: [
    expandEventDay,
    displayEventCount
  ]
})
export class CalendarComponent implements OnInit {

  @Output() exitFullScreenEvent = new EventEmitter();
  @Input() calendar: ICalendarBuilder;
  @Input() isShow: boolean = false; // calendar is showing
  @Input() collapseEvents: string; // calendar is showing
  expandedDate: string | null;
  faTimesCircle = faTimesCircle;
  eventsByDay: Array<IShift[]> = [];

  constructor() { }

  ngOnInit(): void {
    this.calendar.days.map( (day: string, indexDay: number) => {
      const shiftEvents: IShift[] = [];
      this.calendar.period.docs[0].shifts.map((shift: IShift) => {
        shift.events.map( (event: IEvent) => {
          if(moment(event.fromDatetime, "YYYY-MM-DD").isSame(day)){
            shiftEvents.push(shift);
          }
        });
      });
      this.eventsByDay.push(shiftEvents);
    });
  }

  exitFullScreen(e){
    this.exitFullScreenEvent.emit(e);
  }

}
