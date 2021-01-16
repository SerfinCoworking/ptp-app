import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from 'moment';
import { IEvent, IDialogEvent } from '@interfaces/schedule';
import { MatDialog } from '@angular/material/dialog';
import { faTrashAlt, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { collapseDefaultSchedules } from '@shared/animations/calendar.animations';


@Component({
  selector: 'app-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.sass'],
  animations: [
    collapseDefaultSchedules
  ]
})
export class TimeSelectionComponent implements OnInit {
  
  eventsValue: IDialogEvent[] = [];
  spinners: boolean = false;
  dateEventHours: number = 0;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;
  faClock = faClock;
  faPlus = faPlus;
  isCollapsed: boolean[] = [false, false];

  constructor(
    public dialogRef: MatDialogRef<TimeSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialog: MatDialog) {}

  ngOnInit(): void {

    if(this.data.eventDates.length){
      this.data.eventDates.map((event:  IEvent) => {

        const dateFrom = moment(event.fromDatetime);
        const dateTo = moment(event.toDatetime);

        const eventInit = {
          fromDate: {
            day: dateFrom.format('YYYY-MM-DD'),
            time: {
              hour: dateFrom.get('hours'),
              minute: dateFrom.get('minute')
            }
          },
          toDate: {
            day: dateTo.format('YYYY-MM-DD'),
            time: {
              hour: dateTo.get('hours'),
              minute: dateTo.get('minute')
            }
          },
          checkin: event.checkin,
          checkout: event.checkout
        };
        this.eventsValue.push(eventInit);
      });
    }else{
      this.addSecondEvent();
    }

    this.calcHours();
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    const events: IEvent[] = [];

    this.eventsValue.map((eventValue: IDialogEvent) => {
      const event: IEvent = {
        fromDatetime: moment(eventValue.fromDate.day)
                                    .set('hour', eventValue.fromDate.time.hour)
                                    .set('minute', eventValue.fromDate.time.minute)
                                    .format("YYYY-MM-DD HH:mm"),
        toDatetime: moment(eventValue.toDate.day)
                                    .set('hour', eventValue.toDate.time.hour)
                                    .set('minute', eventValue.toDate.time.minute)
                                    .format("YYYY-MM-DD HH:mm"),
        checkin: eventValue.checkin,
        checkout: eventValue.checkout
      }
      events.push(event);
    });


    this.dialogRef.close(events);
  }

  addSecondEvent(){
    const eventInit = {
      fromDate: {
        day: this.data.cdate,
        time: {
          hour: 0,
          minute: 0
        }
      },
      toDate: {
        day: this.data.cdate,
        time: {
          hour: 0,
          minute: 0
        }
      }
    };
    this.eventsValue.push(eventInit);
  }

  removeSecondEvent(index: number){
    this.eventsValue.splice(index, 1);
    this.calcHours();
  }

  fromDateChange(e, index: number){
    // si el indice es mayor a 0
    if(index){
      // modificamos el DATE_FROM según el DATE_FROM del último evento
      const refFrom = this.eventsValue[index - 1].toDate;
      const isHoursGreater: boolean = refFrom.time.hour >= e.hour;
      const isMinutesGreater: boolean = refFrom.time.minute >= e.minute;
      if(isHoursGreater && isMinutesGreater){
        const dayMoment = moment(refFrom.day).add(1, 'day');
        this.eventsValue[index].fromDate.day = dayMoment.format('YYYY-MM-DD');
      }else{
        this.eventsValue[index].fromDate.day = refFrom.day;
      }
    }
    
    // luego modificamos el DATE_TO  segun el DATE_FROM de este evento
    const refTo = this.eventsValue[index].fromDate;
    const isHoursGreater: boolean = e.hour >= this.eventsValue[index].toDate.time.hour;
    const isMinutesGreater: boolean = e.minute >= this.eventsValue[index].toDate.time.minute;
        
    if(isHoursGreater && isMinutesGreater){
      const dayMoment = moment(refTo.day).add(1, 'day');
      this.eventsValue[index].toDate.day = dayMoment.format('YYYY-MM-DD');
    }else{
      this.eventsValue[index].toDate.day = refTo.day;
    }

    // actualizamos todos los eventos en cascada
    if((this.eventsValue.length - 1) > index){
      this.cascadeDateChange((index + 1));
    }
    this.calcHours();
  }

  toDateChange(e, index){

    const refDate = this.eventsValue[index].fromDate;
    const isHoursGreater: boolean = refDate.time.hour >= e.hour;
    const isMinutesGreater: boolean = refDate.time.minute >= e.minute;
    // modificamos el DATE_TO  segun el DATE_FROM de este evento
    if(isHoursGreater && isMinutesGreater){
      const dayMoment = moment(refDate.day).add(1, 'day');
      this.eventsValue[index].toDate.day = dayMoment.format('YYYY-MM-DD');
    }else{
      this.eventsValue[index].toDate.day = refDate.day;
    }

    // actualizamos todos los eventos en cascada
    if((this.eventsValue.length - 1) > index){
      this.cascadeDateChange((index + 1));
    }
    this.calcHours();

  }

  cascadeDateChange(index){
    const isHoursGreaterFrom: boolean = this.eventsValue[index-1].toDate.time.hour >= this.eventsValue[index].fromDate.time.hour;
    const isMinutesGreaterFrom: boolean = this.eventsValue[index-1].toDate.time.minute >= this.eventsValue[index].fromDate.time.minute;

    if(isHoursGreaterFrom && isMinutesGreaterFrom){
      const dayMoment = moment(this.eventsValue[index-1].toDate.day).add(1, 'day');
      this.eventsValue[index].fromDate.day = dayMoment.format('YYYY-MM-DD');
    }else{
      this.eventsValue[index].fromDate.day = this.eventsValue[index-1].toDate.day;

    }

    const isHoursGreaterTo: boolean = this.eventsValue[index].fromDate.time.hour >= this.eventsValue[index].toDate.time.hour;
    const isMinutesGreaterTo: boolean = this.eventsValue[index].fromDate.time.minute >= this.eventsValue[index].toDate.time.minute;

    if(isHoursGreaterTo && isMinutesGreaterTo){
      const dayMoment = moment(this.eventsValue[index].fromDate.day).add(1, 'day');
      this.eventsValue[index].toDate.day = dayMoment.format('YYYY-MM-DD');
    }else{
      this.eventsValue[index].toDate.day = this.eventsValue[index].fromDate.day;
    }

    // actualizamos todos los eventos en cascada
    if((this.eventsValue.length - 1) > index){
      this.cascadeDateChange((index + 1));
    }
  }

  calcHours(): void{
    this.dateEventHours = 0;
    this.eventsValue.map((event) => {
      const fromDate = moment(event.fromDate.day).set('hour', event.fromDate.time.hour).set('minute', event.fromDate.time.minute);
      const toDate = moment(event.toDate.day).set('hour', event.toDate.time.hour).set('minute', event.toDate.time.minute);
      this.dateEventHours += toDate.diff(fromDate, 'hours', true);
    });
  }

  selectDefaultSchedule(schedule, eventIndex){
    this.eventsValue[eventIndex].fromDate.time = schedule.fromTime;
    this.fromDateChange(schedule.fromTime, eventIndex);

    this.eventsValue[eventIndex].toDate.time = schedule.toTime;
    this.toDateChange(schedule.toTime, eventIndex);

  }

}
