import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMonitorWeek } from '@shared/models/plannig';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { IEvent } from '@shared/models/schedule';
import { SocketIoService } from '@shared/services/socket-io.service';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.sass']
})
export class DayDialogComponent {

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  
  constructor(
    public dialogRef: MatDialogRef<DayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  { weekDay: IMonitorWeek, periodId: string },
    private sockectService: SocketIoService,
    private authService: AuthService) {}


  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  removesCheckInCorrection(event: IEvent, employeeId: string){
    event.checkin_corrected = false;
    const userId = this.authService.getLoggedUserId();
    this.sockectService.emitToServer('event:update', { periodId: this.data.periodId, employeeId: employeeId, event: event, user: userId });
  }
  
  removesCheckOutCorrection(event: IEvent, employeeId: string){
    event.checkout_corrected = false;
    const userId = this.authService.getLoggedUserId();
    this.sockectService.emitToServer('event:update', { periodId: this.data.periodId, employeeId: employeeId, event: event, user: userId });
  }

}
