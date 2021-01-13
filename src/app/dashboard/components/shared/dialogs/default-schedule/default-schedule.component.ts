import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from 'moment';
import { IEvent, IDialogEvent } from '@interfaces/schedule';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-default-schedule',
  templateUrl: './default-schedule.component.html',
  styleUrls: ['./default-schedule.component.sass']
})
export class DefaultScheduleComponent implements OnInit {
  
  eventsValue: IDialogEvent[] = [];
  spinners: boolean = false;
  dateEventHours: number = 0;
  faClock = faClock;

  constructor(
    public dialogRef: MatDialogRef<DefaultScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}


  ngOnInit(): void {
   
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(schedule): void {
    this.dialogRef.close(schedule);
  }
 
}
