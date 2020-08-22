import { Component, Input, ViewChildren, QueryList, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { DayInlineComponent } from '@dashboard/components/shared/calendar-inline/day-inline/day-inline.component';
import { IEvent } from '@interfaces/schedule';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IEmployee } from '@interfaces/employee';
import { TimeSelectionComponent } from '../../dialogs/time-selection/time-selection.component';

@Component({
  selector: 'app-week-inline',
  templateUrl: './week-inline.component.html',
  styleUrls: ['./week-inline.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WeekInlineComponent implements OnChanges {

  @ViewChildren(DayInlineComponent)
  days: QueryList<DayInlineComponent>

  @Output() updateShiftEventsEvent: EventEmitter<IEvent[]> = new EventEmitter();
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
      events.map((event: IEvent) => {
        const eventFromDate = moment(event.fromDatetime);
        const eventToDate = moment(event.toDatetime);
        const indexOfDateFrom: number = this.week.indexOf(eventFromDate.format("YYYY-MM-DD"));
        const indexOfDateTo: number = this.week.indexOf(eventToDate.format("YYYY-MM-DD"));
        if(indexOfDateFrom >= 0){
          const dayComponent = this.days.toArray()[indexOfDateFrom];
          dayComponent.displayEvent(eventFromDate, null);
        }

        if(indexOfDateTo >= 0){
          const dayComponent = this.days.toArray()[indexOfDateTo];
          dayComponent.displayEvent(null, eventToDate);
        }
      })
    });
  }

  addShift(dayIndex: number, day: string){
    if(typeof dayIndex === 'undefined'){ return; }

    const dialogConfig = new MatDialogConfig();
    const dayComponent = this.days.toArray()[dayIndex];

    dialogConfig.data = { employee: this.shiftEmployee, cdate: day, eventDate: dayComponent.getEvent()};

    this.dialog.open(TimeSelectionComponent, dialogConfig)
    .afterClosed()
    .subscribe((result: any)  => {
      if (result) {
        this.updateShiftEventsEvent.emit(result.events);
      }
    });
  }

}
