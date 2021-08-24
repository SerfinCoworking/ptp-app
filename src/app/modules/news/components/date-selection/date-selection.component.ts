import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.sass']
})
export class DateSelectionComponent implements OnInit, OnChanges {

  @Input() fromDateStored: string;
  @Input() toDateStored: string;
  @Input() conceptKey: string;
  @Input() error: string;
  @Output() selectedDatesEvent: EventEmitter<any> = new EventEmitter;
  
  private noRangeConcepts: string[] = ['ADELANTO', 'BAJA', 'EMBARGO', 'PLUS_RESPONSABILIDAD'];
  hideRange: boolean = true;
  defaultDate: string;

  hoveredDate: NgbDate | null = null;
  
  singleDate: string;
  fromDate: string;
  toDate: string | null = null;  
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.conceptKey && changes.conceptKey.currentValue){
      this.hideRange = this.noRangeConcepts.includes(changes.conceptKey.currentValue);
    }
  }

  ngOnInit(): void {
    const today = moment();
    this.defaultDate = today.format("DD/MM/YYYY");
    if(!!this.fromDateStored){
      const fromDate = moment(this.fromDateStored, "YYYY-MM-DD");
      this.fromDate = fromDate.format('DD/MM/YYYY');
      this.singleDate = fromDate.format('DD/MM/YYYY');
    }

    if(!!this.toDateStored){
      const toDate = moment(this.toDateStored, "YYYY-MM-DD");
      this.toDate = toDate.format('DD/MM/YYYY');
    }
  }

  onDateSelectionOnlyFrom() {
    const fromDate = this.singleDate ? moment(this.singleDate, "DD/MM/YYYY") : null;
    const toDate = this.singleDate ? moment(this.singleDate, "DD/MM/YYYY") : null;
    this.selectedDatesEvent.emit({fromDate, toDate});
  }

  onDateSelection(date) {
    const fomatter = moment(new Date()).set({
      'date': date.day,
      'month': (date.month - 1),
      'year': date.year
    });
    const from = moment(this.fromDate, "DD/MM/YYYY"); // fix: obtener comparacion para ingresar al set de toDate
  
    if (this.fromDate == this.toDate && fomatter.isAfter(from, "date")) {
      this.toDate = fomatter.format('DD/MM/YYYY');
    } else {
      this.toDate = fomatter.format('DD/MM/YYYY');
      this.fromDate = fomatter.format('DD/MM/YYYY');
    }
    const fromDate = this.fromDate ? moment(this.fromDate, "DD/MM/YYYY") : null;
    const toDate = this.toDate ? moment(this.toDate, "DD/MM/YYYY") : null;
    this.selectedDatesEvent.emit({fromDate, toDate});
  }

  isHovered(date: NgbDate) {
    const fromDate: NgbDate = {
      day: moment(this.fromDate, 'DD/MM/YYYY').get('date'),
      month: (moment(this.fromDate, 'DD/MM/YYYY').get('month') + 1),
      year: moment(this.fromDate, 'DD/MM/YYYY').get('year')
    } as NgbDate;
    return this.fromDate == this.toDate && this.hoveredDate && date.after(fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    const fromDate: NgbDate = {
      day: moment(this.fromDate, 'DD/MM/YYYY').get('date'),
      month: (moment(this.fromDate, 'DD/MM/YYYY').get('month') + 1),
      year: moment(this.fromDate, 'DD/MM/YYYY').get('year')
    } as NgbDate;

    const toDate: NgbDate = {
      day: moment(this.toDate, 'DD/MM/YYYY').get('date'),
      month: (moment(this.toDate, 'DD/MM/YYYY').get('month') + 1),
      year: moment(this.toDate, 'DD/MM/YYYY').get('year')
    } as NgbDate;
    return this.toDate && date.after(fromDate) && date.before(toDate);
  }

  isRange(date: NgbDate) {
    const fromDate: NgbDate = {
      day: moment(this.fromDate, 'DD/MM/YYYY').get('date'),
      month: (moment(this.fromDate, 'DD/MM/YYYY').get('month') + 1),
      year: moment(this.fromDate, 'DD/MM/YYYY').get('year')
    } as NgbDate;
    
    const toDate: NgbDate = {
      day: moment(this.toDate, 'DD/MM/YYYY').get('date'),
      month: (moment(this.toDate, 'DD/MM/YYYY').get('month') + 1),
      year: moment(this.toDate, 'DD/MM/YYYY').get('year')
    } as NgbDate;
    return date.equals(fromDate) || (this.toDate && date.equals(toDate)) || this.isInside(date) || this.isHovered(date);
  }
}
