import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IObjective } from '@interfaces/objective';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input';
import { Moment } from 'moment';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-second-step-form',
  templateUrl: './second-step-form.component.html',
  styleUrls: ['./second-step-form.component.sass']
})
export class SecondStepFormComponent implements OnInit {
  @Output() fromDateChangeEvent = new EventEmitter();
  @Output() toDateChangeEvent = new EventEmitter();
  @Input() objective: IObjective | null;
  faEye = faEye;
  constructor() { }

  ngOnInit(): void {
  }

  fromDateChange(e: MatDatepickerInputEvent<Moment>){
    this.fromDateChangeEvent.emit(e.value.format("YYYY-MM-DD"));
  }
  toDateChange(e: MatDatepickerInputEvent<Moment>){
    this.toDateChangeEvent.emit(e.value.format("YYYY-MM-DD"));
  }
}
