import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICalendar } from '@interfaces/schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnChanges, OnInit {

  @Input() schedule: ICalendar;
  @Input() isShow: boolean = false; // calendar is showing
  expandedDate: string | null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.isShow, "schedule", this.isShow);
    if(changes.isShow.currentValue){
      // this.isShow = changes.isShow.currentValue;
    }
  }

  ngOnInit(): void {
  }

}
