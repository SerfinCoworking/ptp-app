import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  @Output() selectedDatesEvent: EventEmitter<any> = new EventEmitter;
  
  private noRangeConcepts: string[] = ['ADELANTO', 'BAJA', 'EMBARGO'];
  hideRange: boolean = true;
  telegramDateModel: NgbDateStruct;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.conceptKey.currentValue){
      this.hideRange = this.noRangeConcepts.includes(changes.conceptKey.currentValue);
    }
  }

  ngOnInit(): void {
    if(this.fromDateStored.length){
      const fromDate = moment(this.fromDateStored, "YYYY-MM-DD");
      this.fromDate.day = fromDate.get('date');
      this.fromDate.month = (fromDate.get('month') - 1);
      this.fromDate.year = fromDate.get('year');
    }
    if(this.toDateStored.length){
      const toDate = moment(this.toDateStored, "YYYY-MM-DD");
      this.toDate.day = toDate.get('date');
      this.toDate.month = (toDate.get('month') - 1);
      this.toDate.year = toDate.get('year');
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    const formDate = moment().set({
      'date': this.fromDate.day,
      'month': (this.fromDate.month - 1),
      'year': this.fromDate.year
    });
    const toDate = moment().set({ 
      'date': this.toDate?.day || date.day,
      'month': (this.toDate?.month - 1) || (date.month - 1),
      'year': this.toDate?.year || date.year
    });
    this.selectedDatesEvent.emit({fromDate: formDate.format("YYYY-MM-DD"), toDate: toDate.format("YYYY-MM-DD")});
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
}
