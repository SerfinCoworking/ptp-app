import { Component, OnInit } from '@angular/core';
import { LiquidationService } from '@shared/services/liquidation.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { faSpinner, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import ILiquidation, { LiquidationMonths } from '@interfaces/liquidation';
import { PaginationResult } from '@interfaces/pagination';
import {MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {


  hoveredDate: NgbDate | null = null;

  initCalendar: {year: number, month: number};
  rangeFromDate: NgbDate;
  rangeToDate: NgbDate | null = null;
  faSpinner = faSpinner;
  faTrashAlt = faTrashAlt;
  faEye = faEye;
  isLoading: boolean = false;
  rangeError: string = '';
  months: LiquidationMonths[] = [
    {month: 'Enero'},
    {month: 'Febrero'},
    {month: 'Marzo'},
    {month: 'Abril'},
    {month: 'Mayo'},
    {month: 'Junio'},
    {month: 'Julio'},
    {month: 'Agosto'},
    {month: 'Septiembre'},
    {month: 'Octubre'},
    {month: 'Noviembre'},
    {month: 'Diciembre'}
  ];
  year: number;
  liquidations: PaginationResult<ILiquidation>;


  constructor(private liquidationService: LiquidationService, private router: Router) { }

  ngOnInit(): void {
    this.year = moment().year();
    const startFrom = moment().set('month', 11).set('date', 26).set('year', (this.year - 1));
    const endFrom = moment().set('month', 0).set('date', 25).set('year', moment().year());
    this.months.map((month) => {
      const start = moment(startFrom.format("YYYY-MM-DD"));
      const end = moment(endFrom.format("YYYY-MM-DD"));
      month.from = start;
      month.to = end;
      startFrom.add(1, 'month')
      endFrom.add(1, 'month')
    });
    this.initCalendar = {year: moment().year(), month: parseInt(moment().format("M"))}; 
    this.liquidationService.list().subscribe(res => {
      this.liquidations = res;
    });
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

  selectRange(monthIndex: number){
    this.router.navigate(['/dashboard/liquidacion/reporte'], { queryParams: { fromDate: this.months[monthIndex].from.format("DD_MM_YYYY"), toDate: this.months[monthIndex].to.format("DD_MM_YYYY") } }); 
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
