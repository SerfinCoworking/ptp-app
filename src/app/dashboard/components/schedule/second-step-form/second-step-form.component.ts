import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IObjective } from '@interfaces/objective';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import { ScheduleService } from '@shared/services/schedule.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IPeriod, ISchedule } from '@interfaces/schedule';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-second-step-form',
  templateUrl: './second-step-form.component.html',
  styleUrls: ['./second-step-form.component.sass']
})
export class SecondStepFormComponent implements OnInit {
  @Output() nextStepEvent = new EventEmitter();
  @Output() previousStepEvent = new EventEmitter();
  @Output() periodEvent = new EventEmitter();
  @Input() objective: IObjective | null;
  @Input() schedule: ISchedule | null;
  @Input() periods: IPeriod[] | null;
  selectedPeriodFlag: {fromDate: string, toDate: string} = {fromDate: '', toDate: ''};
  isLoading: boolean = false;
  faEye = faEye;
  faPen = faPen;
  faSpinner = faSpinner;
  invalidSelection: string | null;
  hoveredDate: NgbDate | null = null;

  initCalendar: {year: number, month: number};
  rangeFromDate: NgbDate;
  rangeToDate: NgbDate | null = null;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    const today: moment.Moment = moment();
    this.initCalendar = {year: today.year(), month: parseInt(today.format("M"))};     
  }

  submitPeriodForm(){
    const fromDate = moment().set({'year': this.rangeFromDate.year, 'month': (this.rangeFromDate.month - 1), 'date': this.rangeFromDate.day});
    const toDate = moment().set({'year': this.rangeToDate.year, 'month': (this.rangeToDate.month - 1), 'date': this.rangeToDate.day});
    if(this.rangeFromDate && this.rangeToDate && this.selectedPeriodFlag?.fromDate != fromDate.format("YYYY-MM-DD") && this.selectedPeriodFlag?.toDate != toDate.format("YYYY-MM-DD")){
        this.isLoading = true;
        this.scheduleService.createPeriod(this.objective, fromDate.format("YYYY-MM-DD"), toDate.format("YYYY-MM-DD")).subscribe(
          res => {
            this.isLoading = false;
            this.selectedPeriodFlag.fromDate = fromDate.format("YYYY-MM-DD");
            this.selectedPeriodFlag.toDate = toDate.format("YYYY-MM-DD");
            this.periodEvent.emit(res);
            this.nextStepEvent.emit();
          },
          err => {
            this.invalidSelection = err.error[0].message;
            this.isLoading = false;
          }
        );
    }else if( this.selectedPeriodFlag?.fromDate == fromDate.format("YYYY-MM-DD") && this.selectedPeriodFlag?.toDate == toDate.format("YYYY-MM-DD")){
      this.nextStepEvent.emit();
    }
  }

  // period selection
  onDateSelection(date: NgbDate) {
    if (!this.rangeFromDate && !this.rangeToDate) {
      this.rangeFromDate = date;
    } else if (this.rangeFromDate && !this.rangeToDate && date.after(this.rangeFromDate)) {
      this.rangeToDate = date;
    } else {
      this.rangeToDate = null;
      this.rangeFromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.rangeFromDate && !this.rangeToDate && this.hoveredDate && date.after(this.rangeFromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.rangeToDate && date.after(this.rangeFromDate) && date.before(this.rangeToDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.rangeFromDate) || (this.rangeToDate && date.equals(this.rangeToDate)) || this.isInside(date) || this.isHovered(date);
  }

  previousStep(){
    this.previousStepEvent.emit();
  }
}
