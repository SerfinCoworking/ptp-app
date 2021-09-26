import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDefaultSchedule } from '@shared/models/objective';
import { IEvent } from '@shared/models/schedule';
import moment from 'moment';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-schedule-select',
  templateUrl: './schedule-select.component.html',
  styleUrls: ['./schedule-select.component.sass']
})
export class ScheduleSelectComponent implements OnInit {

  @Input() defaultSchedules: Array<IDefaultSchedule>;
  @Input() scheduleNumber: number;
  @Input() date: string;
  @Input() event: IEvent;
  @Output() eventChange: EventEmitter<IEvent> = new EventEmitter<IEvent>();

  faTrashAlt = faTrashAlt; 

  constructor() { }

  ngOnInit(): void {
  }

  setEvent(defaultSchedule: IDefaultSchedule){
    const qDay: number = defaultSchedule.fromTime.hour > defaultSchedule.toTime.hour ? 1 : 0;
    this.event = {
      fromDatetime: moment(this.date, "YYYY-MM-DD").set({hour: defaultSchedule.fromTime.hour, minute: defaultSchedule.fromTime.minute}).format("YYYY-MM-DD HH:mm"),
      toDatetime: moment(this.date, "YYYY-MM-DD").add(qDay, 'day').set({hour: defaultSchedule.toTime.hour, minute: defaultSchedule.toTime.minute}).format("YYYY-MM-DD HH:mm"),
      color: defaultSchedule.color,
      name: defaultSchedule.name
    };

    this.eventChange.emit(this.event);
  }

  removeEvent(): void{
    this.event = {} as IEvent;
    console.log("DELETE EVENT");
    this.eventChange.emit(this.event);
  }
}
