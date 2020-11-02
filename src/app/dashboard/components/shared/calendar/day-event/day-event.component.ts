import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IShift, IEvent } from '@interfaces/schedule';
import { expandEventsDate } from '@shared/animations/calendar.animations';
import { faCheckCircle  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-day-event',
  host: {
    '[class.first-week]': 'isFirstWeek',
    '[class.second-week]': 'isSecondWeek',
    '[class.third-week]': 'isThirdWeek',
    '[class.fourth-week]': 'isFourthWeek',
    '[class.fiveth-week]': 'isFivethWeek',
    '[class.sixth-week]': 'isSixthWeek'
  },
  templateUrl: './day-event.component.html',
  styleUrls: ['./day-event.component.sass'],
  animations:[
    expandEventsDate
  ]
})
export class DayEventComponent implements OnChanges, OnInit {

  @Input() day: string;
  @Input() dayEventClass: string;
  @Input() dayIndex: number;
  @Input() shifts: IShift[];
  eventsDay: IShift[] = []; /// these are our filtered shifts that will be draw
  events: IEvent[]; // these are all event by employee. It ia an array because, one employee could have 2 events in a day. Example: in: 06-24 08:00:00 - out: 06-24 12:00:00  / in: 06-24 16:00:00 - out: 06-24 20:00:00
  statusClass: string;

  isFirstWeek: boolean = false;
  isSecondWeek: boolean = false;
  isThirdWeek: boolean = false;
  isFourthWeek: boolean = false;
  isFivethWeek: boolean = false;
  isSixthWeek: boolean = false;
  faCheckCircle = faCheckCircle;
  constructor() {}

  // changes detection for expand events
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.dayEventClass){
      this.statusClass = changes.dayEventClass.currentValue;
    }
  }

  ngOnInit(): void {
    this.getHostClass();
  }

  // assign differents classes to host compoent
  getHostClass(){
    this.isFirstWeek = (this.dayIndex >= 1 && this.dayIndex <= 7);
    this.isSecondWeek = (this.dayIndex >= 8 && this.dayIndex <= 14);
    this.isThirdWeek = (this.dayIndex >= 15 && this.dayIndex <= 21);
    this.isFourthWeek = (this.dayIndex >= 22 && this.dayIndex <= 28);
    this.isFivethWeek = (this.dayIndex >= 29 && this.dayIndex <= 35);
    this.isSixthWeek = (this.dayIndex >= 36 && this.dayIndex <= 42);
  }
}
