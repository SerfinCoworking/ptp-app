import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEmployee } from '@shared/models/employee';
import INews from '@shared/models/news';
import { IObjective } from '@shared/models/objective';
import { IEvent, IChangesEvent } from '@shared/models/schedule';
import { remove,  concat } from "lodash";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  @Output() updatePeriodShiftsEvent: EventEmitter<IEvent[]> = new EventEmitter();
  // @Input() shiftEmployee: IEmployee;
  // @Input() shiftEvents: IEvent[];
  // @Input() shiftOtherEvents: IEvent[];
  // @Input() xAxis: string;
  // @Input() objective: IObjective;
  // @Input() builder: Array<string[]>;
  // @Input() news: Array<INews[]>;

  constructor() { }

  ngOnInit(): void {
  }

  updateShiftEvents(changesEvent: IChangesEvent){
    // temporal merge function, we need keep in mind, we could duplicate events with the same or partial same dates and times

    // changesEvent.oldEvents.forEach((oldEvent: IEvent) => {
    //   this.shiftEvents = remove(this.shiftEvents, function(event: IEvent) {
    //     return event !== oldEvent;
    //   });
    // });
    // const mergedEvents: IEvent[] = concat(this.shiftEvents, changesEvent.newEvents);
    // this.shiftEvents = [...mergedEvents]; //update shift and this trigger onChage hook on it childrend
    // this.updatePeriodShiftsEvent.emit(this.shiftEvents); // update the main object
  }

}
