import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.sass']
})
export class EventDialogComponent implements OnInit {


  
// eventsValue: IDialogEvent[] = [];
spinners: boolean = false;
dateEventHours: number = 0;
// faTrashAlt = faTrashAlt;
// faTimes = faTimes;
// faClock = faClock;
// faPlus = faPlus;
isCollapsed: boolean[] = [false, false];

constructor(
  public dialogRef: MatDialogRef<EventDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private dialog: MatDialog) {}

ngOnInit(): void {

  
  // if(this.data.eventDates.length){
  //   this.data.eventDates.map((event:  IEvent) => {
  //     this.eventsValue.push(this.setEvent(event));
  //   });
    
  // }else{      

  //   this.addSecondEvent();
  // }

  // this.calcHours();
}

close(): void {
  this.dialogRef.close(false);
}

confirm(): void {
  // const events: IEvent[] = [];

  // this.eventsValue.map((eventValue: IDialogEvent) => {
  //   if(eventValue.origin){

  //     const event: IEvent = {
  //       fromDatetime: moment(eventValue.fromDate.day)
  //       .set('hour', eventValue.fromDate.time.hour)
  //       .set('minute', eventValue.fromDate.time.minute)
  //       .format("YYYY-MM-DD HH:mm"),
  //       toDatetime: moment(eventValue.toDate.day)
  //       .set('hour', eventValue.toDate.time.hour)
  //       .set('minute', eventValue.toDate.time.minute)
  //       .format("YYYY-MM-DD HH:mm"),
  //       checkin: eventValue.checkin,
  //       checkout: eventValue.checkout,
  //       origin: true
  //     }
  //     events.push(event);
  //   }
  // });


  this.dialogRef.close(true);
}

}