import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDefaultSchedule } from '@shared/models/objective';
import { IEvent } from '@shared/models/schedule';
import { EventService } from '@shared/services/event.service';
import moment from 'moment';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.sass']
})
export class EventDialogComponent implements OnInit {

  spinners: boolean = false;
  dateEventHours: number = 0;
  isCollapsed: boolean[] = [false, false];
  events: IEvent[] = [];
  otherEvents: IEvent[] = [];
  defaultSchedulesBk: Array<IDefaultSchedule> = [];
  selectedWeekDays: string[] = [];
  updatePlanning: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private eventService: EventService) {}

  ngOnInit(): void {
    this.events = [...this.data.day.events];
    this.otherEvents = [...this.data.day.otherEvents];
    this.updateDefaultSchedules();
    
  }

  eventUpdate(e, index): void {
    this.events[index] = e;
    this.updateDefaultSchedules();
  }

  eventDelete(e, index): void{
    this.events.splice(index, 1);
    this.updateDefaultSchedules();  
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    const events: Array<IEvent> = this.events.filter((ev: IEvent) => ev.fromDatetime && ev.toDatetime);
    this.dialogRef.close({events, updatePlanning: this.updatePlanning});
  }

  private updateDefaultSchedules(): void{
    this.defaultSchedulesBk = [...this.data.defaultSchedules];
    if(this.events.length > 0){
      this.events.map((event: IEvent) => {     
        if(event.fromDatetime && event.toDatetime) {
          const fromDate = moment(new Date(event.fromDatetime), "YYYY-MM-DD HH:mm");
          const toDate = moment(new Date(event.toDatetime), "YYYY-MM-DD HH:mm");
          
          this.defaultSchedulesBk = this.data.defaultSchedules.filter((defaultSch: IDefaultSchedule) => {
            return fromDate.get('hours') < toDate.get('hours') && toDate.get('hours') < defaultSch.fromTime.hour;
          });
        }
      });
    }
    
    if(this.otherEvents.length > 0){
      this.otherEvents.map((otEvent: IEvent) => {     
        if(otEvent.fromDatetime && otEvent.toDatetime) {
          const fromDate = moment(new Date(otEvent.fromDatetime), "YYYY-MM-DD HH:mm");
          const toDate = moment(new Date(otEvent.toDatetime), "YYYY-MM-DD HH:mm");
          
          this.defaultSchedulesBk = this.defaultSchedulesBk.filter((defaultSch: IDefaultSchedule) => {
            return fromDate.get('hours') < toDate.get('hours') && toDate.get('hours') < defaultSch.fromTime.hour;
          });
        }
      });
    }

    if(this.defaultSchedulesBk.length && 
      this.events.length < 2 && 
      ((this.events.length > 0 && this.events[0]?.fromDatetime && this.events[0]?.toDatetime) ||
      this.events.length == 0) ) this.events.push({} as IEvent);  
  }

  onCheckChange(event){
    
    if(this.selectedWeekDays.includes(event.target.value)){
      const index = this.selectedWeekDays.findIndex((day) => day === event.target.value);
      this.selectedWeekDays.splice(index, 1);
    }else{
      this.selectedWeekDays.push(event.target.value);
    }
    console.log(this.selectedWeekDays);
  }

  replicateEventsByDay(){
    const days: string = this.selectedWeekDays.join('_');
    this.eventService.replicateEvents(this.data.periodId, this.data.employee._id, this.events, days).subscribe((res) => {
      this.updatePlanning = true;
    });
  }

}