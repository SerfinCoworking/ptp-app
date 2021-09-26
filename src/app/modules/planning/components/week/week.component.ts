import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IEvent, IShiftEmployee } from '@shared/models/schedule';
import moment from 'moment';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.sass']
})
export class WeekComponent implements OnInit{


  @Input() week: Array<any>;
  @Input() employee: IShiftEmployee;
  @Input() weekTotalHs: number;
  @Input() defaultSchedules: Array<any>;
  @Output() weekTotalHsChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalEventsHsChange: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void{
  }

  addEvent(day:any):void{
    // First take day total hours
    let totalDayHsEvents = 0;
    day.events.map((event: IEvent) => {
      if(event.fromDatetime && event.toDatetime){
        const toDatetime = moment(event.toDatetime, "YYYY-MM-DD HH:mm");
        totalDayHsEvents += toDatetime.diff(event.fromDatetime, 'hours');
      }
    })
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { day: day, defaultSchedules: this.defaultSchedules};

    this.dialog.open(EventDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe((events: Array<IEvent>)  => {
      if(events){

        let newTotalDayHsEvents = 0;
        events.map((event: IEvent) => {
          if(event.fromDatetime && event.toDatetime){
            const toDatetime = moment(event.toDatetime, "YYYY-MM-DD HH:mm");
            newTotalDayHsEvents += toDatetime.diff(event.fromDatetime, 'hours');
          }
        });
        
        // Substract old total and sum new total day hours events
        this.weekTotalHs -= totalDayHsEvents;
        this.weekTotalHs += newTotalDayHsEvents;
        this.weekTotalHsChange.emit(this.weekTotalHs);
        this.totalEventsHsChange.emit();
      }
    });
  }
}
