import { Component, Input, ViewChildren, QueryList, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { DayInlineComponent } from '@dashboard/components/shared/calendar-inline/day-inline/day-inline.component';
import { IEvent } from '@interfaces/schedule';
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

  @Output() updateShiftEventsEvent: EventEmitter<{newValues: IEvent[], oldValues: IEvent}> = new EventEmitter();
  @Input() week: Array<string>;
  @Input() shiftEvents: IEvent[];
  @Input() shiftEmployee: IEmployee;

  constructor(private dialog: MatDialog) {}

  ngOnChanges(change: SimpleChanges): void {
    if(change.shiftEvents.currentValue){
      this.setEvents(change.shiftEvents.currentValue);
    }
  }

  // ngAfterViewInit(): void {

    // this.setEvents(this.shiftEvents);
  // }

  setEvents(events: IEvent[]){
    setTimeout(() => {

      const indexes: number[] = [];

      events.map((event: IEvent) => {
        const eventFromDate = moment(event.fromDatetime);
        const eventToDate = moment(event.toDatetime);
        const indexOfDateFrom: number = this.week.indexOf(eventFromDate.format("YYYY-MM-DD"));
        const indexOfDateTo: number = this.week.indexOf(eventToDate.format("YYYY-MM-DD"));
        if(indexOfDateFrom >= 0 && indexOfDateTo >= 0 && (indexOfDateFrom === indexOfDateTo)){
          const dayComponent = this.days.toArray()[indexOfDateFrom];
          dayComponent.displayEvent(eventFromDate, eventToDate);
          indexes.push(indexOfDateFrom);
        }
        else {
          if(indexOfDateFrom >= 0){
            const dayComponent = this.days.toArray()[indexOfDateFrom];
            dayComponent.displayEvent(eventFromDate, null);
            indexes.push(indexOfDateFrom);
          }
            if(indexOfDateTo >= 0){
            const dayComponent = this.days.toArray()[indexOfDateTo];
            dayComponent.displayEvent(null, eventToDate);
            indexes.push(indexOfDateTo);
          }
        }
      });

      // volvemos a defualt los indices los dias que no tienen eventos
      const notInDefault = uniq(indexes);
      this.week.map((day: string, index: number) => {
        if(!notInDefault.includes(index)){
          console.log(index, "===DEBUG");
          const dayComponent = this.days.toArray()[index];
          dayComponent.displayEvent(null, null);
        }
      })


    });
  }

  addShift(dayIndex: number, day: string){
    if(typeof dayIndex === 'undefined'){ return; }

    const dialogConfig = new MatDialogConfig();
    const eventDate: IEvent = this.shiftEvents.find( (event: IEvent ) => {
      return moment(event.fromDatetime, "YYYY-MM-DD").isSame(day) || moment(event.toDatetime, "YYYY-MM-DD").isSame(day)
    });

    dialogConfig.data = { employee: this.shiftEmployee, cdate: day, eventDate: eventDate};

    this.dialog.open(TimeSelectionComponent, dialogConfig)
    .afterClosed()
    .subscribe((result: any)  => {
      if (result) {
        const eventPackage = {newValues: result.events, oldValues: eventDate};
        this.updateShiftEventsEvent.emit(eventPackage);
      }
    });
  }

}
