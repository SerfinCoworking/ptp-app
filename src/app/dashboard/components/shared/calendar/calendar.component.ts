import { Component, OnInit, Input } from '@angular/core';
import { ICalendar, IShift, IEvent } from '@interfaces/schedule';
import * as moment from 'moment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  @Input() schedule: ICalendar;

  constructor() { }

  ngOnInit(): void {
  }

}
