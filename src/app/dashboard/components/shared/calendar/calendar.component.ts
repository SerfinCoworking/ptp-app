import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICalendarBuilder, IPeriod, IShift, IEvent } from '@interfaces/schedule';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import * as moment from 'moment';
// fontawesome icons
import { faEye, faPen, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  @Output() exitFullScreenEvent = new EventEmitter();
  @Output() showCalendarEvent = new EventEmitter();
  @Output() deletePeriodEvent = new EventEmitter();
  @Input() calendar: ICalendarBuilder;
  @Input() isShow: boolean = false; // calendar is showing
  @Input() collapseEvents: string; // calendar is showing
  expandedDate: string | null;
  faTimesCircle = faTimesCircle;
  eventsByDay: Array<IShift[]> = [];
  today: moment.Moment = moment();
  minDate: moment.Moment;
  maxDate: moment.Moment;
  faEye = faEye;
  faPen = faPen;
  faTrashAlt = faTrashAlt
  faPlus = faPlus
  

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if(this.calendar.period.docs[0]){
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
}
