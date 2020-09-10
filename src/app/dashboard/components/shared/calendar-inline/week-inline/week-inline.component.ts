import { Component, Input, ViewChildren, QueryList, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { DayInlineComponent } from '@dashboard/components/shared/calendar-inline/day-inline/day-inline.component';
import { IEvent, IChangesEvent } from '@interfaces/schedule';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IEmployee } from '@interfaces/employee';
import { TimeSelectionComponent } from '../../dialogs/time-selection/time-selection.component';
import {uniq} from "lodash";

@Component({
  selector: 'app-week-inline',
  templateUrl: './week-inline.component.html',
  styleUrls: ['./week-inline.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WeekInlineComponent implements OnChanges {

  @ViewChildren(DayInlineComponent)
  days: QueryList<DayInlineComponent>

  @Output() updateShiftEventsEvent: EventEmitter<IChangesEvent> = new EventEmitter();
  @Input() week: Array<string>;
  @Input() shiftEvents: IEvent[];
  @Input() shiftEmployee: IEmployee;

  constructor(private dialog: MatDialog) {}

  ngOnChanges(change: SimpleChanges): void {
    if(change.shiftEvents.currentValue){
      this.setEvents(change.shiftEvents.currentValue);
    }
  }


  setEvents(events: IEvent[]){
    setTimeout(() => {

      const indexes: number[] = [];

      // const notInDefault = uniq(indexes);
      this.week.map((day: string, index: number) => {
        // if(!notInDefault.includes(index)){
          const dayComponent = this.days.toArray()[index];
          dayComponent.cleanEvents();
          // dayComponent.displayEvent(null, null);
        // }
      });


      events.map((event: IEvent) => {
        const eventFromDate = moment(event.fromDatetime);
        const eventToDate = moment(event.toDatetime);
        const indexOfDateFrom: number = this.week.indexOf(eventFromDate.format("YYYY-MM-DD"));
        const indexOfDateTo: number = this.week.indexOf(eventToDate.format("YYYY-MM-DD"));

        if(indexOfDateFrom >= 0 && indexOfDateTo >= 0 && (indexOfDateFrom === indexOfDateTo)){
          const dayComponent = this.days.toArray()[indexOfDateFrom];
          dayComponent.displayEvents(eventFromDate.format("YYYY-MM-DD HH:mm"), eventToDate.format("YYYY-MM-DD HH:mm"));
          indexes.push(indexOfDateFrom);
        }
        else {
          if(indexOfDateFrom >= 0){
            const dayComponent = this.days.toArray()[indexOfDateFrom];
            dayComponent.displayEvents(eventFromDate.format("YYYY-MM-DD HH:mm"), null);
            indexes.push(indexOfDateFrom);
          }
            if(indexOfDateTo >= 0){
            const dayComponent = this.days.toArray()[indexOfDateTo];
            dayComponent.displayEvents(null, eventToDate.format("YYYY-MM-DD HH:mm"));
            indexes.push(indexOfDateTo);
          }
        }
      });

      // volvemos a defualt los indices de los dias que no tienen eventos
      // const notInDefault = uniq(indexes);
      // this.week.map((day: string, index: number) => {
      //   if(!notInDefault.includes(index)){
      //     const dayComponent = this.days.toArray()[index];
      //     dayComponent.cleanEvents();
      //     // dayComponent.displayEvent(null, null);
      //   }
      // });
    });
  }

  addShift(dayIndex: number, day: string){
    if(typeof dayIndex === 'undefined'){ return; }

    const dialogConfig = new MatDialogConfig();
    const eventDates: IEvent[] = this.shiftEvents.filter( (event: IEvent ) => {
      return moment(event.fromDatetime, "YYYY-MM-DD").isSame(day) || moment(event.toDatetime, "YYYY-MM-DD").isSame(day)
    });

    dialogConfig.data = { employee: this.shiftEmployee, cdate: day, eventDates: eventDates};

    this.dialog.open(TimeSelectionComponent, dialogConfig)
    .afterClosed()
    .subscribe((result: IEvent[])  => {
      if (result) {
        const eventPackage: IChangesEvent = { newEvents: result, oldEvents: eventDates };
        this.updateShiftEventsEvent.emit(eventPackage);
      }
    });
  }

}
