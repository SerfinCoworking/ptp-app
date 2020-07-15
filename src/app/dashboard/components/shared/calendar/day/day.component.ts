import { Component, OnInit, Input } from '@angular/core';
import { ICalendar, IShift, IEvent } from '@interfaces/schedule';
import * as moment from 'moment';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {

  @Input() day: string;
  @Input() shifts: IShift[];
  eventsDay: IShift[] = []; /// these are our filtered shifts that will be draw
  events: IEvent[]; // these are all event by employee. It ia an array because, one employee could have 2 events in a day. Example: in: 06-24 08:00:00 - out: 06-24 12:00:00  / in: 06-24 16:00:00 - out: 06-24 20:00:00


  constructor() {}

  ngOnInit(): void {
    this.shifts.forEach((shift: IShift) => {
      this.events = [];

      shift.events.forEach((event: IEvent) => {
        const fromDate = moment(event.fromDatetime);
        if(fromDate.isSame(this.day, 'day')){
          this.events.push(event);
        }
      });
      if(this.events.length){
        this.eventsDay.push({ employee: shift.employee, events: this.events });
        console.log("=====This day has event", this.eventsDay);
      }
    });
  }


}
