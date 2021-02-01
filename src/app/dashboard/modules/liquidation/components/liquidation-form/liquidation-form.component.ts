import { Component, OnInit } from '@angular/core';
import { LiquidationService } from '@dashboard/services/liquidation.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liquidation-form',
  templateUrl: './liquidation-form.component.html',
  styleUrls: ['./liquidation-form.component.sass']
})
export class LiquidationFormComponent implements OnInit {


  hoveredDate: NgbDate | null = null;

  initCalendar: {year: number, month: number};
  rangeFromDate: NgbDate;
  rangeToDate: NgbDate | null = null;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  rangeError: string = '';


  constructor(private liquidationService: LiquidationService, private router: Router) { }

  ngOnInit(): void {
    this.initCalendar = {year: moment().year(), month: parseInt(moment().format("M"))}; 
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

  buildLiquidationSchema(){
    this.isLoading = true;
    if(this.isValidRange(this.rangeFromDate, this.rangeToDate)){
      const fromDate = moment().set({'year': this.rangeFromDate.year, 'month': (this.rangeFromDate.month - 1), 'date': this.rangeFromDate.day});
      const toDate = moment().set({'year': this.rangeToDate.year, 'month': (this.rangeToDate.month - 1), 'date': this.rangeToDate.day});
      this.router.navigate(['/dashboard/liquidacion/reporte'], { queryParams: { fromDate: fromDate.format("DD_MM_YYYY"), toDate: toDate.format("DD_MM_YYYY") } }); 
    }else{
      this.isLoading = false;
      this.rangeError = 'Debe seleccionar un rango de fechas.';
    }
  }
  private isValidRange(from, to): boolean{
    return typeof(from) !== 'undefined' && 
    typeof(to) !== 'undefined' && 
    from !== null && 
    to !== null && 
    typeof(from.year) !== 'undefined' && 
    typeof(from.month) !== 'undefined' && 
    typeof(from.day) !== 'undefined' && 
    typeof(to.year) !== 'undefined' && 
    typeof(to.month) !== 'undefined' && 
    typeof(to.day) !== 'undefined';
  }
}
