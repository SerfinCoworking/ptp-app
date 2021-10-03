import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDefaultSchedule } from '@shared/models/objective';
import { IEvent } from '@shared/models/schedule';
import moment from 'moment';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { EventService } from '@shared/services/event.service';
@Component({
  selector: 'app-schedule-select',
  templateUrl: './schedule-select.component.html',
  styleUrls: ['./schedule-select.component.sass']
})
export class ScheduleSelectComponent {

  @Input() defaultSchedules: Array<IDefaultSchedule>;
  @Input() scheduleNumber: number;
  @Input() editable: boolean = true;
  @Input() date: string;
  @Input() periodId: string;
  @Input() employeeId: string;
  @Input() event: IEvent;
  @Output() eventChange: EventEmitter<IEvent> = new EventEmitter<IEvent>();
  @Output() eventDelete: EventEmitter<IEvent> = new EventEmitter<IEvent>();

  faTrashAlt = faTrashAlt; 

  constructor(private eventService: EventService) { }

  setEvent(defaultSchedule: IDefaultSchedule){
    const qDay: number = defaultSchedule.fromTime.hour > defaultSchedule.toTime.hour ? 1 : 0;
    const fromDate = moment(this.date, "YYYY-MM-DD").set({hour: defaultSchedule.fromTime.hour, minute: defaultSchedule.fromTime.minute});
    const toDate = moment(this.date, "YYYY-MM-DD").add(qDay, 'day').set({hour: defaultSchedule.toTime.hour, minute: defaultSchedule.toTime.minute});
    this.event = {
      ...this.event,
      fromDatetime: fromDate.format("YYYY-MM-DD HH:mm"),
      toDatetime: toDate.format("YYYY-MM-DD HH:mm"),
      color: defaultSchedule.color,
      name: defaultSchedule.name
    };
    this.eventService.createOrUpdate(this.event, this.periodId, this.employeeId).subscribe((res) => {
      this.eventChange.emit(res.event);
    })
  }

  removeEvent(): void{
    this.eventService.deleteEvent(this.event, this.periodId, this.employeeId).subscribe((res) => {
      this.event = {} as IEvent;
      this.eventDelete.emit(this.event);
    });
  }
}
