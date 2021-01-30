import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ICalendarBuilder, IPeriod, IShift, IEvent, IChangesEvent } from '@interfaces/schedule';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import * as moment from 'moment';
// fontawesome icons
import { faSpinner, faTimesCircle, faEye, faPen, faTrashAlt, faPlus, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { PaginationResult } from '@interfaces/pagination';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnChanges, OnInit {

  @Output() previousPeriodEvent = new EventEmitter();
  @Output() nextPeriodEvent = new EventEmitter();
  @Output() exitFullScreenEvent = new EventEmitter();
  @Output() showCalendarEvent = new EventEmitter();
  @Output() deletePeriodEvent = new EventEmitter();
  @Output() saveSignsEvent = new EventEmitter();
  @Input('calendar') calendarInp: ICalendarBuilder;
  @Input() isShow: boolean = false; // calendar is showing
  @Input() collapseEvents: string; // calendar is showing
  
  calendar: ICalendarBuilder;
  period: PaginationResult<IPeriod>;
  days: Array<string>;
  expandedDate: string | null;
  eventsByDay: Array<IShift[]> = [];
  
  today: moment.Moment = moment();
  minDate: moment.Moment;
  maxDate: moment.Moment;
  
  faSpinner = faSpinner;
  faEye = faEye;
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faAngleLeft = faAngleLeft; 
  faAngleRight = faAngleRight;
  faTimesCircle = faTimesCircle;

  disablePrevPeriod: boolean;
  disableNextPeriod: boolean;
  loadingLeft: boolean = false;
  loadingRight: boolean = false;
  

  constructor(private dialog: MatDialog, private scheduleService: ScheduleService,) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.calendarInp && changes.calendarInp.currentValue){
      this.calendar = changes.calendarInp.currentValue;

      if(!this.isShow){
        this.eventsByDay = [];
        this.period = this.calendar.period;
        this.days = this.calendar.days;
        if(this.calendar.period.docs.length){
          this.calendar.days.map( (day: string, indexDay: number) => {
            const shiftEvents: IShift[] = [];
            this.calendar.period.docs[0].shifts.map((shift: IShift) => {
              const eventsCount: IEvent[] = [];          
              shift.events.map( (event: IEvent) => {
                if(moment(event.fromDatetime).isSame(day, 'day')){
                  eventsCount.push(event);
                }
              });
              if(eventsCount.length){
                shiftEvents.push({employee: shift.employee, events: eventsCount}); // pasamos todos el shift completo (MAL)
              }
              
            });
            this.eventsByDay.push(shiftEvents);
          });
          this.minDate = moment(this.calendar.period.docs[0].fromDate);
          this.maxDate = moment(this.calendar.period.docs[0].toDate);
          this.disablePrevPeriod = !(this.calendar.period.page > 1);
          this.disableNextPeriod = !(this.calendar.period.page < this.calendar.period.pages);
          this.loadingLeft = false;
          this.loadingRight = false;
        }
      }
    }    
  }

  ngOnInit(){
    if(this.isShow){

      this.scheduleService.calendarEvents.subscribe((calendarEvents: {period: PaginationResult<IPeriod>, days: Array<string>}) => {
        
        this.eventsByDay = [];
        this.period = calendarEvents.period;
        this.days = calendarEvents.days;
        calendarEvents.days.map( (day: string, indexDay: number) => {
          const shiftEvents: IShift[] = [];
          calendarEvents.period.docs[0].shifts.map((shift: IShift) => {
            const eventsCount: IEvent[] = [];          
            shift.events.map( (event: IEvent) => {
              if(moment(event.fromDatetime).isSame(day, 'day')){
                eventsCount.push(event);
              }
            });
            if(eventsCount.length){
              shiftEvents.push({employee: shift.employee, events: eventsCount}); // pasamos todos el shift completo (MAL)
            }
            
          });
          this.eventsByDay.push(shiftEvents);
        });
        this.minDate = moment(calendarEvents.period.docs[0].fromDate);
        this.maxDate = moment(calendarEvents.period.docs[0].toDate);
        this.disablePrevPeriod = !(calendarEvents.period.page > 1);
        this.disableNextPeriod = !(calendarEvents.period.page < calendarEvents.period.pages);
        this.loadingLeft = false;
        this.loadingRight = false;
      });
    }
  
  }

  exitFullScreen(e): void{
    if(this.expandedDate){
      this.expandedDate = null;
      return;
    }
    this.exitFullScreenEvent.emit(e);
  }

  showCalendarEmitter(){
    this.showCalendarEvent.emit();
  }

  openDialog(period: IPeriod) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar el periodo  ${period.fromDate} - ${period.toDate}?`, title: `${period.objective.name}` };
    this.dialog.open(ConfirmComponent, dialogConfig)
      .afterClosed()
      .subscribe((success: boolean)  => {
        if (success) {
          this.deletePeriodEvent.emit(period._id);
        }
      });
  }
  
  
  previousPeriod(){
    this.loadingLeft = true;
    this.previousPeriodEvent.emit(this.calendar.period);
  }
  
  nextPeriod(){
    this.loadingRight = true;
    this.nextPeriodEvent.emit(this.calendar.period);
  }
  
  openEmployeeEventDialog(e, index){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { employeeEvent: this.eventsByDay[index][e] };
    this.dialog.open(EventDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result: IEvent[])  => {
        if (result) {
          // build package data 
          const eventPackage: any = { 
            periodId: this.calendar.period.docs[0]._id,
            employeeId: this.eventsByDay[index][e].employee._id,
            eventsDay: result, 
          };
          this.saveSignsEvent.emit(eventPackage);
        }
      });
  }
  toggleEvents(e, count, day){
    this.expandedDate = ((this.expandedDate === day) || !this.eventsByDay[count].length) ? null : day
  }
}
