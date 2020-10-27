import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
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
  @Input() shiftOtherEvents: IEvent[];
  @Input() builder: Array<string[]>;


  hoursTotal: number = 0;
  hoursPerWeek: number[] = [];
  allEvents: IEvent[] = [];
  faTrashAlt = faTrashAlt;
  faCalendarAlt = faCalendarAlt;
  maxHours: number = 48;

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void{
    
    if(changes.events.currentValue || changes.shiftOtherEvents?.currentValue){
      this.allEvents = [];
      this.allEvents.push(...changes.events.currentValue, ...this.shiftOtherEvents);
      
      this.hoursTotal = 0;
      this.initHoursPerWeek();
      this.allEvents.map((event: IEvent) => {
        const hours = moment(event.toDatetime).diff(event.fromDatetime, 'hours', true);
        this.hoursTotal += hours;
        this.builder.map((week, index) => {
          const isInDate: boolean = moment(event.fromDatetime).isBetween(week[0], week[(week.length - 1)], 'day', '[]');
          if(isInDate){
            this.hoursPerWeek[index] += hours; 
          }
        });
      });
    }

  }

  ngOnInit():void{
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Si elimina al empleado también se eliminarán todas sus guardias para este objetivo.`, title: `Eliminar empleado ${this.employee.firstName} ${this.employee.lastName}?` };
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.removeEmployeeEvent.emit();
      }
    });
  }

  initHoursPerWeek(){
    this.hoursPerWeek = [];
    this.builder.map((week) => {
      this.hoursPerWeek.push(0);
    });
  }
}
