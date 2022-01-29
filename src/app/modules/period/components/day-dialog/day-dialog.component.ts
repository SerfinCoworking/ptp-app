import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMonitorWeek } from '@shared/models/plannig';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.sass']
})
export class DayDialogComponent {

  faCheckCircle = faCheckCircle;
  
  constructor(
    public dialogRef: MatDialogRef<DayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  { weekDay: IMonitorWeek, periodId: string }) {}


  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
