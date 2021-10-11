import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.sass']
})
export class DayDialogComponent implements OnInit {

  weekDay: any;

  constructor(
    public dialogRef: MatDialogRef<DayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // this.weekDay = this.data
    console.log(this.data);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    // const events: Array<IEvent> = this.events.filter((ev: IEvent) => ev.fromDatetime && ev.toDatetime);
    this.dialogRef.close(true);
  }

}
