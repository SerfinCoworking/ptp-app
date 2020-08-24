import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { ICalendarBuilder, IShift, IEvent } from '@interfaces/schedule';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnChanges, OnInit {

  @Output() exitFullScreenEvent = new EventEmitter();
  @Input() calendar: ICalendarBuilder;
  @Input() isShow: boolean = false; // calendar is showing
  expandedDate: string | null;
  faTimesCircle = faTimesCircle;
  eventsByDay: Array<IShift[]> = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes.isShow, "schedule", this.isShow);
    if(changes.isShow.currentValue){
      // this.isShow = changes.isShow.currentValue;
    }
  }

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
    console.log(this.eventsByDay);
  }

  exitFullScreen(e){
    this.exitFullScreenEvent.emit(e);
  }

}
