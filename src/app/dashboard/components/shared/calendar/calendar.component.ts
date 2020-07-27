import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { ICalendarBuilder } from '@interfaces/schedule';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


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

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.isShow, "schedule", this.isShow);
    if(changes.isShow.currentValue){
      // this.isShow = changes.isShow.currentValue;
    }
  }

  ngOnInit(): void {
  }

  exitFullScreen(e){
    this.exitFullScreenEvent.emit(e);
  }

}
