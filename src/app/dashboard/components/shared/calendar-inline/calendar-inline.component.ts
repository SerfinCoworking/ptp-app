import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEmployee } from '@interfaces/employee';
import { IEvent, IChangesEvent } from '@interfaces/schedule';
import { remove,  concat } from "lodash";


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

  updateShiftEvents(changesEvent: IChangesEvent){
    // temporal merge function, we need keep in mind, we could duplicate events with the same or partial same dates and times

    changesEvent.oldEvents.forEach((oldEvent: IEvent) => {
      this.shiftEvents = remove(this.shiftEvents, function(event: IEvent) {
        return event !== oldEvent;
      });
    });
    const mergedEvents: IEvent[] = concat(this.shiftEvents, changesEvent.newEvents);
    this.shiftEvents = [...mergedEvents]; //update shift and this trigger onChage hook on it childrend
    this.updatePeriodShiftsEvent.emit(this.shiftEvents); // update the main object
  }

}
