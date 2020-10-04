import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPeriod } from '@interfaces/schedule';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-period-selection',
  templateUrl: './period-selection.component.html',
  styleUrls: ['./period-selection.component.sass']
})
export class PeriodSelectionComponent implements OnInit {
  
  @Output() rangeSelectionEvent: EventEmitter<any> = new EventEmitter();
  @Input('period') period: IPeriod | null;

  hoveredDate: NgbDate | null = null;

  initCalendar: {year: number, month: number};
  rangeFromDate: NgbDate;
  rangeToDate: NgbDate | null = null;

  constructor() { }

  ngOnInit(): void {
    const fromRange: moment.Moment = moment(this.period.fromDate);
    const toRange: moment.Moment = moment(this.period.toDate);
    console.log(fromRange.format("YYYY-MM-DD"), fromRange.format('DD'), toRange.day());
      

    this.initCalendar = {year: fromRange.year(), month: parseInt(fromRange.format("M"))}; 
    this.rangeFromDate = new NgbDate(fromRange.year(), parseInt(fromRange.format("M")), parseInt(fromRange.format("D"))); 
    this.rangeToDate = new NgbDate(toRange.year(), parseInt(toRange.format("M")), parseInt(toRange.format("D")));  
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
    this.rangeSelectionEvent.emit({rangeFrom: this.rangeFromDate, rangeTo: this.rangeToDate});
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

}
