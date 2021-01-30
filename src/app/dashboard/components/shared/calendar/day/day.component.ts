import { Component, OnInit, OnChanges, Input, EventEmitter, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { IShift, IEvent } from '@interfaces/schedule';
import * as moment from 'moment';
import { expandEventDay, displayEventCount, expandEventToday, expandEventTodayBg, expandEventBtn } from '@shared/animations/calendar.animations';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

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

  constructor() {}

  ngOnChanges(changes: SimpleChanges):void{
    this.isInPeriod = true;
    this.isToday = false;
    
    this.isInPeriod = this.minDate.isSameOrBefore(this.day) && this.maxDate.isSameOrAfter(this.day);
    this.isToday = this.today.isSame(this.day, "day");
      
    if(changes.shifts && changes.shifts.currentValue){
      const now = moment();
      if(this.shifts.length){
        this.shifts.map((shift: any) => {
          shift.events.map((event: any) => {
            // 4 Estados:
            // ENABLED: in time to checkin / checkout
            // OUT_OF_TIME: out of permited range checkin / checkout
            // FAIL: not checkin / checkout
            // SUCCESS: in range permited checkin / checkout
            shift.signedIn = 'ENABLED';
            shift.signedOut = 'ENABLED';
            
            if(event.checkin){
              const checkin = moment(event.checkin);
              shift.signedIn = (checkin.diff(event.fromDatetime, 'minutes') > 30 || moment(event.fromDatetime).diff(checkin, 'minutes') > 30) ? 'OUT_OF_TIME' : 'SUCCESS';
            }else if(now.diff(event.fromDatetime, 'minutes') > 30){
              shift.signedIn = 'FAIL';
            }

            if(event.checkout){
              // checkeo si marco más de 30 minutos antes de su horario de salida definido
              const checkout = moment(event.checkout);
              shift.signedOut = checkout.diff(event.toDatetime, 'minutes') > 30 || moment(event.toDatetime).diff(checkout, 'minutes') > 30 ? 'OUT_OF_TIME' : 'SUCCESS';
            }else if(now.diff(event.toDatetime, 'minutes') > 30){
              shift.signedOut = 'FAIL';
            }

          });
        });
      }
    }
  }
  
  ngOnInit(): void {}

  openDialog(sIndex: number){
    this.employeeClickEvent.emit(sIndex);
  }
  
  openEvents(){
    this.dayClickEvent.emit();
  }
}
