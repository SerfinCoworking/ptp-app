import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from 'moment';
import { IEvent, IDialogEvent } from '@interfaces/schedule';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.sass']
})
export class TimeSelectionComponent implements OnInit {
  
  eventsValue: IDialogEvent[] = [];
  spinners: boolean = false;
  dateEventHours: number = 0;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;

  constructor(
    public dialogRef: MatDialogRef<TimeSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}


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
      const addDayFrom = refFrom.time.hour >= e.hour;
      if(addDayFrom){
        const dayMoment = moment(refFrom.day).add(1, 'day');
        this.eventsValue[index].fromDate.day = dayMoment.format('YYYY-MM-DD');
      }else{
        this.eventsValue[index].fromDate.day = refFrom.day;
      }
    }

    // luego modificamos el DATE_TO  segun el DATE_FROM de este evento
    const refTo = this.eventsValue[index].fromDate;
    const addDay: boolean = e.hour >= this.eventsValue[index].toDate.time.hour;

    if(addDay){
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
    const addDay: boolean = refDate.time.hour >= e.hour;

    // modificamos el DATE_TO  segun el DATE_FROM de este evento
    if(addDay){
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
    const addDayFrom: boolean = this.eventsValue[index-1].toDate.time.hour >= this.eventsValue[index].fromDate.time.hour;

    if(addDayFrom){
      const dayMoment = moment(this.eventsValue[index-1].toDate.day).add(1, 'day');
      this.eventsValue[index].fromDate.day = dayMoment.format('YYYY-MM-DD');
    }else{
      this.eventsValue[index].fromDate.day = this.eventsValue[index-1].toDate.day;

    }

    const addDayTo: boolean = this.eventsValue[index].fromDate.time.hour >= this.eventsValue[index].toDate.time.hour;

    if(addDayTo){
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

}
