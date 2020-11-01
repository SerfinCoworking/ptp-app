import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IShift, IEvent } from '@interfaces/schedule';
import * as moment from 'moment';
import { expandEventDay, displayEventCount, expandEventToday, expandEventTodayBg } from '@shared/animations/calendar.animations';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass'],
  animations: [
    expandEventDay,
    displayEventCount,
    expandEventToday,
    expandEventTodayBg
  ]
})
export class DayComponent implements OnInit {

  @Output() employeeClickEvent = new EventEmitter();
  @Input() day: string;
  @Input() shifts: Array<IShift[]> = [];
  @Input() collapseEvents: string;
  @Input() today: moment.Moment;
  @Input() minDate: moment.Moment;
  @Input() maxDate: moment.Moment;

  isInPeriod: boolean = true;
  isToday: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isInPeriod = this.minDate.isSameOrBefore(this.day) && this.maxDate.isSameOrAfter(this.day);
    this.isToday = this.today.isSame(this.day, "day");
  }

  openDialog(sIndex: number){
    this.employeeClickEvent.emit(sIndex);
  }
}
