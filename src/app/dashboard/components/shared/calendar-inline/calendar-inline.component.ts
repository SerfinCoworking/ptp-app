import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEmployee } from '@interfaces/employee';
import { IEvent } from '@interfaces/schedule';
import { uniq, concat, merge } from "lodash";


@Component({
  selector: 'app-calendar-inline',
  templateUrl: './calendar-inline.component.html',
  styleUrls: ['./calendar-inline.component.sass']
})
export class CalendarInlineComponent implements OnInit {

  @Output() updatePeriodShiftsEvent: EventEmitter<IEvent[]> = new EventEmitter();
  @Input() shiftEmployee: IEmployee;
  @Input() shiftEvents: IEvent[];
  @Input() xAxis: string;
  @Input() builder: Array<string[]>;

  constructor() { }

  ngOnInit(): void {
  }

  updateShiftEvents(e){
    // temporal merge function, we need keep in mind, we could duplicate events with the same or partial same dates and times
    const mergedEvents: IEvent[] = merge(this.shiftEvents, e);
    this.shiftEvents = [...mergedEvents]; //update shift and this trigger onChage hook on it childrend
    this.updatePeriodShiftsEvent.emit(this.shiftEvents); // update the main object
  }

}
