import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ɵpatchComponentDefWithScope } from '@angular/core';
import { faTrashAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { IEvent } from '@shared/models/schedule';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import * as moment from 'moment';
import { TemplatesComponent } from '@dashboard/components/shared/dialogs/templates/templates.component';
import { ITemplate } from '@shared/models/template';

@Component({
  selector: 'app-employee-actions',
  templateUrl: './employee-actions.component.html',
  styleUrls: ['./employee-actions.component.sass']
})
export class EmployeeActionsComponent implements OnChanges, OnInit {

  @Output() removeEmployeeEvent: EventEmitter<any> = new EventEmitter();
  @Output() updatePeriodShiftsEvent: EventEmitter<any> = new EventEmitter();
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
  
  openCalDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Si elimina al empleado también se eliminarán todas sus guardias para este objetivo.`, title: `Eliminar empleado ${this.employee.firstName} ${this.employee.lastName}?` };
    this.dialog.open(TemplatesComponent, dialogConfig)
    .afterClosed()
    .subscribe((resp: ITemplate | undefined | boolean)  => {
      if (resp) {
        const template = resp as ITemplate;
        const events: IEvent[] = [];        
        
        this.builder.map((week: Array<string>) => { // recorremos cada semana
          week.map((day: string) => { // recorremos cada dia
            const dayMoment = moment(day, "YYYY-MM-DD");
            template.schedule.map((sch) => { // recorremos cada dia del schedule
              if(sch.day.match( new RegExp(dayMoment.format("dddd"), 'i'))){
                
                // Agregamos horario 1
                if(!!sch.firstTime.from.hour){ //comprobamos que tiene primer horario cargado
                  const from = moment(day, "YYYY-MM-DD").hour(sch.firstTime.from.hour as number).minute(sch.firstTime.from.minute as number)
                  const to = moment(day, "YYYY-MM-DD").hour(sch.firstTime.to.hour as number).minute(sch.firstTime.to.minute as number)
                  events.push({
                    fromDatetime: from.format("YYYY-MM-DD HH:mm"),
                    toDatetime: to.format("YYYY-MM-DD HH:mm")
                  })
                }
                // Agregamos horario 2
                if(!!sch.secondTime.from.hour){ //comprobamos que tiene segundo horario cargado

                  const from = moment(day, "YYYY-MM-DD").hour(sch.secondTime.from.hour as number).minute(sch.secondTime.from.minute as number)
                  const to = moment(day, "YYYY-MM-DD").hour(sch.secondTime.to.hour as number).minute(sch.secondTime.to.minute as number)
                  events.push({
                    fromDatetime: from.format("YYYY-MM-DD HH:mm"),
                    toDatetime: to.format("YYYY-MM-DD HH:mm")
                  })
                }
              }
            })
          })
        });
        this.updatePeriodShiftsEvent.emit(events);
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
