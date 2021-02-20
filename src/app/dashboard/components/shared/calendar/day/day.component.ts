import { Component, OnInit, OnChanges, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { IShift } from '@interfaces/schedule';
import * as moment from 'moment';
import { expandEventDay, displayEventCount, expandEventToday, expandEventTodayBg, expandEventBtn } from '@shared/animations/calendar.animations';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass'],
  animations: [
    expandEventDay,
    displayEventCount,
    expandEventToday,
    expandEventTodayBg,
    expandEventBtn
  ]
})
export class DayComponent implements OnChanges, OnInit {

  @Output() employeeClickEvent = new EventEmitter();
  @Output() dayClickEvent = new EventEmitter();
  @Input() day: string;
  @Input() shifts: Array<IShift[]> = [];
  @Input() collapseEvents: string;
  @Input() today: moment.Moment;
  @Input() minDate: moment.Moment;
  @Input() maxDate: moment.Moment;
  @Input() isShow: boolean;
  @Input() toggleEvents: string;


  isInPeriod: boolean = true;
  isToday: boolean = false;
  faAngleDown = faAngleDown; 
  faAngleUp = faAngleUp;

  circuleDimRem = {
    width: 2.65,
    height: 2.65,
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges):void{
    this.isInPeriod = true;
    this.isToday = false;
    
    this.isInPeriod = this.minDate.isSameOrBefore(this.day) && this.maxDate.isSameOrAfter(this.day);
    this.isToday = this.today.isSame(this.day, "day");
    
  }
  
  ngOnInit(): void {}

  openDialog(sIndex: number){
    this.employeeClickEvent.emit(sIndex);
  }
  
  openEvents(){
    this.dayClickEvent.emit();
  }
}
