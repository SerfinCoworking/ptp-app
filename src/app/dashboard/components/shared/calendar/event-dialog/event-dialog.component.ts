import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IDialogSignedEvent, IEvent } from '@interfaces/schedule';
import moment from 'moment';
import { faSpinner, faCheck, faTimes  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.sass']
})
export class EventDialogComponent implements OnInit {

  eventsValue: IDialogSignedEvent[] = [];
  spinners: boolean = false;
  dateEventHours: number = 0;
  faCheck = faCheck;
  faTimes = faTimes;
  displayTimeSelector: Array<{checkin, checkout}> = [];
  events: IEvent[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.events = this.data.employeeEvent.events;
    this.data.employeeEvent.events.map((event:  IEvent, index) => {

      const checkIn = moment(event.fromDatetime);
      const checkOut = moment(event.toDatetime);
      this.displayTimeSelector.push({checkin: false, checkout: false});
      const eventInit = {
        checkin: {
          day: checkIn.format('YYYY-MM-DD'),
          time: {
            hour: checkIn.get('hours'),
            minute: checkIn.get('minute')
          }
        },
        checkout: {
          day: checkOut.format('YYYY-MM-DD'),
          time: {
            hour: checkOut.get('hours'),
            minute: checkOut.get('minute')
          }
        },
        fromDatetime: event.fromDatetime,
        toDatetime: event.toDatetime
      };
      this.eventsValue.push(eventInit);
    });
    console.log(this.eventsValue, "DEBUG");
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    console.log(this.events);
      // const events: IEvent[] = [];

      // this.eventsValue.map((eventValue: IDialogSignedEvent) => {
      //   const event: IEvent = {
      //     checkin: moment(eventValue.checkin.day)
      //                                 .set('hour', eventValue.checkin.time.hour)
      //                                 .set('minute', eventValue.checkin.time.minute)
      //                                 .format("YYYY-MM-DD HH:mm"),
      //     checkout: moment(eventValue.checkout.day)
      //                                 .set('hour', eventValue.checkout.time.hour)
      //                                 .set('minute', eventValue.checkout.time.minute)
      //                                 .format("YYYY-MM-DD HH:mm"),
      //     fromDatetime: eventValue.fromDatetime,
      //     toDatetime: eventValue.toDatetime
      //   }
      //   events.push(event);
      // });


      this.dialogRef.close(this.events);
  }
 
  toggleCITimeSelector(index): void{
    this.displayTimeSelector[index]['checkin'] = !this.displayTimeSelector[index]['checkin'];
  }
  
  setCheckin(index): void{
    this.events[index].checkin = moment(this.eventsValue[index].checkin.day)
                                    .set('hour', this.eventsValue[index].checkin.time.hour)
                                    .set('minute', this.eventsValue[index].checkin.time.minute)
                                    .format("YYYY-MM-DD HH:mm");

    this.displayTimeSelector[index]['checkin'] = !this.displayTimeSelector[index]['checkin'];
  }
  
  toggleCOTimeSelector(index): void{
    this.displayTimeSelector[index]['checkout'] = !this.displayTimeSelector[index]['checkout'];
  }
  
  setCheckout(index): void{
    const checkout = moment(this.eventsValue[index].checkout.day)
                                    .set('hour', this.eventsValue[index].checkout.time.hour)
                                    .set('minute', this.eventsValue[index].checkout.time.minute)
                                    .format("YYYY-MM-DD HH:mm");

    this.events[index].checkout = checkout;
    this.displayTimeSelector[index]['checkout'] = !this.displayTimeSelector[index]['checkout'];
  }
}



