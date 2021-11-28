import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment as env } from '@root/environments/environment';
import INews from '@shared/models/news';
import { IEvent, IShiftEmployee } from '@shared/models/schedule';
import moment from 'moment';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.sass']
})
export class WeekComponent{


  @Input() week: Array<any>;
  @Input() employee: IShiftEmployee;
  @Input() weekTotalHs: number;
  @Input() defaultSchedules: Array<any>;
  @Input() periodId: string;
  @Output() weekTotalHsChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalEventsHsChange: EventEmitter<any> = new EventEmitter<any>();

  private disableNewsDay: Array<string> = [env.CONCEPT_BAJA, env.CONCEPT_LIC_SIN_SUELDO, env.CONCEPT_VACACIONES, env.CONCEPT_SUSPENSION];
  
  constructor(private dialog: MatDialog) {}


  addEvent(day:any):void{
    // First filter open dialog by news concept
    const disableOpenDialog: boolean = day.news.filter((news: INews) => this.disableNewsDay.includes(news.concept.key)).length > 0;
    if(disableOpenDialog) { return; }
    
    // Second take day total hours
    let totalDayHsEvents = 0;
    day.events.map((event: IEvent) => {
      if(event.fromDatetime && event.toDatetime){
        const toDatetime = moment(new Date(event.toDatetime));
        totalDayHsEvents += toDatetime.diff(event.fromDatetime, 'hour');
      }
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { day: day,
      defaultSchedules: this.defaultSchedules,
      employee: this.employee,
      periodId: this.periodId
    };

    this.dialog.open(EventDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe((events)  => {
      if(events){
        let newTotalDayHsEvents = 0;
        events.map((event: IEvent) => {
          if(event.fromDatetime && event.toDatetime){
            const toDatetime = moment(new Date(event.toDatetime));
            newTotalDayHsEvents += toDatetime.diff(event.fromDatetime, 'hours');
          }
        });
        day.events = [...events];
        
        // Substract old total and sum new total day hours events
        this.weekTotalHs -= totalDayHsEvents;
        this.weekTotalHs += newTotalDayHsEvents;
        this.weekTotalHsChange.emit(this.weekTotalHs);
        this.totalEventsHsChange.emit();
      }
    });
  }
}
