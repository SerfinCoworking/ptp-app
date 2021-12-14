import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDefaultSchedule } from '@shared/models/objective';
import { IEvent } from '@shared/models/schedule';
import { EventService } from '@shared/services/event.service';
import moment from 'moment';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-multi-day-dialog',
  templateUrl: './multi-day-dialog.component.html',
  styleUrls: ['./multi-day-dialog.component.sass']
})
export class MultiDayDialogComponent implements OnInit {

  selectedWeekDays: string[] = [];
  events: IEvent[] = [];
  defaultSchedulesBk: Array<IDefaultSchedule> = [];
  faTrashAlt = faTrashAlt;

  constructor(
    public dialogRef: MatDialogRef<MultiDayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private eventService: EventService) {}
    
  ngOnInit(){
    this.defaultSchedulesBk = [...this.data.defaultSchedules];
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    if(this.selectedWeekDays.length && this.events.length){

      const days: string = this.selectedWeekDays.join('_');
      this.eventService.replicateEvents(this.data.periodId, this.data.employee._id, this.events, days).subscribe((res) => {
        this.dialogRef.close(true);
      });
    }
  }

  onCheckChange(event){
    
    if(this.selectedWeekDays.includes(event.target.value)){
      const index = this.selectedWeekDays.findIndex((day) => day === event.target.value);
      this.selectedWeekDays.splice(index, 1);
    }else{
      this.selectedWeekDays.push(event.target.value);
    }
  }

  selectSchedule(schedule: IDefaultSchedule){
    const qDay: number = schedule.fromTime.hour > schedule.toTime.hour ? 1 : 0;
    const fromDate = moment().set({hour: schedule.fromTime.hour, minute: schedule.fromTime.minute});
    const toDate = moment().add(qDay, 'day').set({hour: schedule.toTime.hour, minute: schedule.toTime.minute});
    this.events.push({
      fromDatetime: fromDate.format("YYYY-MM-DD HH:mm"),
      toDatetime: toDate.format("YYYY-MM-DD HH:mm"),
      color: schedule.color,
      name: schedule.name
    });
    this.loadSchedules();
  }
  removeEvent(index: number): void{
    this.events.splice(index, 1);
    this.loadSchedules();
  }

  private loadSchedules(): void{
    if(this.events.length){

      this.events.map((event: IEvent) => {     
        if(event.fromDatetime && event.toDatetime) {
          const fromDate = moment(new Date(event.fromDatetime), "YYYY-MM-DD HH:mm");
          const toDate = moment(new Date(event.toDatetime), "YYYY-MM-DD HH:mm");
          
          this.defaultSchedulesBk = this.data.defaultSchedules.filter((defaultSch: IDefaultSchedule) => {
            return fromDate.get('hours') < toDate.get('hours') && toDate.get('hours') < defaultSch.fromTime.hour;
          });
        }
      });
    }else{
      this.defaultSchedulesBk = [...this.data.defaultSchedules];
    }
  }
}
