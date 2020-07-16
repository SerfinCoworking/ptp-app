import { Component, OnInit, Input } from '@angular/core';
import { ICalendar } from '@interfaces/schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  @Input() schedule: ICalendar;
  expandedDate: string | null;

  constructor() { }

  ngOnInit(): void {
  }

}
