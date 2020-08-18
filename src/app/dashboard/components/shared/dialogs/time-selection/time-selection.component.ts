import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from 'moment';
import { IEvent } from '@interfaces/schedule';

@Component({
  selector: 'app-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.sass']
})
export class TimeSelectionComponent implements OnInit {
  timeFrom = {hour: 0, minute: 0};
  timeTo = {hour: 0, minute: 0};
  nextDate: string;
  isChecked: boolean = false;
  dateEvent: IEvent = {fromDatetime: '', toDatetime: ''};

  constructor(
    public dialogRef: MatDialogRef<TimeSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}


  ngOnInit(): void {
    this.nextDate = moment(this.data.cdate).add(1, 'day').format("YYYY-MM-DD");
    if(this.data.eventDate?.fromDatetime){
      const dateFrom = moment(this.data.eventDate.fromDatetime);
      this.timeFrom.hour = dateFrom.get("hours");
      this.timeFrom.minute = dateFrom.get("minutes");
    }
    if(this.data.eventDate?.toDatetime){
      const dateTo = moment(this.data.eventDate.toDatetime);
      this.timeTo.hour = dateTo.get("hours");
      this.timeTo.minute = dateTo.get("minutes");
      this.isChecked = !moment(this.data.eventDate.toDatetime, "YYYY-MM-DD").isSame(moment(this.data.eventDate.fromDatetime, "YYYY-MM-DD"));
      console.log(this.isChecked, "=======DEBUG");
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    const fromDate = this.data.cdate;
    const toDate = this.isChecked ? this.nextDate : this.data.cdate;

    this.dateEvent.fromDatetime = moment(fromDate)
                                .set('hour', this.timeFrom.hour)
                                .set('minute', this.timeFrom.minute)
                                .format("YYYY-MM-DD HH:mm");
    this.dateEvent.toDatetime = moment(toDate)
                                .set('hour', this.timeTo.hour)
                                .set('minute', this.timeTo.minute)
                                .format("YYYY-MM-DD HH:mm");

    console.log(this.dateEvent, "event generated");
    this.dialogRef.close({event: this.dateEvent, success: true});

  }
}
