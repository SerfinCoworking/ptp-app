import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { IEvent } from '@interfaces/schedule';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-actions',
  templateUrl: './employee-actions.component.html',
  styleUrls: ['./employee-actions.component.sass']
})
export class EmployeeActionsComponent implements OnChanges, OnInit {

  @Output() removeEmployeeEvent: EventEmitter<any> = new EventEmitter();
  @Input() employee: any;
  @Input() events: IEvent[];

  hoursTotal: number = 0;
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void{

    if(changes.events.currentValue && changes.events.currentValue.length){
      this.hoursTotal = 0;
      changes.events.currentValue.map((event: IEvent) => {
        const hours = moment(event.toDatetime).diff(event.fromDatetime, 'hours', true);
        this.hoursTotal += hours;
      });
    }
  }

  ngOnInit():void{
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar al empleado ${this.employee.firstName} ${this.employee.lastName}?`, title: "Eliminar empleado" };
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.removeEmployeeEvent.emit();
      }
    });
  }
}
