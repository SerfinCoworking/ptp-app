import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from 'moment';
import { IEvent, IDialogEvent } from '@interfaces/schedule';

@Component({
  selector: 'app-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.sass']
})
export class TimeSelectionComponent implements OnInit {
  eventsValue: IDialogEvent[] = [];
  // eventNd = { fromDate: {day: "", time: {hour: 0, minute: 0}}, toDate: {day: "", time: {hour: 0, minute: 0}}};


  // nextDate: string;
  isChecked: boolean = false;
  dateEvent: IEvent = {fromDatetime: '', toDatetime: ''};
  showSecondEvent: boolean = false;
  spinners: boolean = false;
  dateEventHours: number = 0;

  constructor(
    public dialogRef: MatDialogRef<TimeSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}


  ngOnInit(): void {


    // this.nextDate = moment(this.data.cdate).add(1, 'day').format("YYYY-MM-DD");

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
          }
        };
        this.eventsValue.push(eventInit);
      });
    }else{
      this.addSecondEvent();
    }


  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    const fromDate = this.data.cdate;
    // const toDate = this.isChecked ? this.nextDate : this.data.cdate;
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
                                    .format("YYYY-MM-DD HH:mm")
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
    this.showSecondEvent = this.eventsValue.length > 1;
  }

  removeSecondEvent(){
    this.eventsValue.splice(1, 1);
    this.showSecondEvent = this.eventsValue.length < 1;
  }
}
