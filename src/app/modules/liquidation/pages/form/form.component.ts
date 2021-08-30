import { Component, OnInit } from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { faSpinner, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import ILiquidation, { LiquidationMonths } from '@shared/models/liquidation';
import { IEmployee } from '@shared/models/employee';
import { LiquidationService } from '@shared/services/liquidation.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  employees: IEmployee[];
  selectedEmployees: IEmployee[];
  liquidation: ILiquidation;

  liquidationForm: FormGroup = this.fBuilder.group({
    _id: [""],
		employeeIds: [""],
    fromDate: [""],
    toDate: [""],
	});

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private liquidationService: LiquidationService,
    private fBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe( data => {
      this.employees = data.employees.docs;
      
      if(data.liquidation){
        this.liquidation = data.liquidation;
        this.selectedEmployees = data.liquidation.liquidatedEmployees.map((liqEmployee) => liqEmployee.employee);
      }else{
        this.selectedEmployees = data.employees.docs;
      }
    });

    this.liquidationForm.reset({
      ...this.liquidation,
      employeeIds: this.selectedEmployees.map((employee) => employee._id),
      fromDate: this.liquidation?.dateFrom,
      toDate: this.liquidation?.dateTo,
    });

    console.log(this.liquidationForm.value);
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
  }

  selectRange(index: number){}

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

  setDates(e):void{
    this.liquidationForm.get('fromDate').setValue(e.fromDate.format("YYYY-MM-DD"));
    this.liquidationForm.get('toDate').setValue(e.toDate?.format("YYYY-MM-DD") || null);
  }

  
  setSelectedEmployees(e){
    this.selectedEmployees = e;
    const employeeIds: string[] = this.selectedEmployees.map(emp => emp._id);
    this.liquidationForm.get('employeeIds').setValue( employeeIds );
  }

  createOrUpdateLiquidation(): void{
    // this.isLoading = true;
    this.liquidationService.createOrUpdate(this.liquidationForm.value).subscribe((res) => {
      const id: string = res.liquidation._id;
      if(res) this.router.navigate([`/dashboard/liquidacion/${id}`]);
    });
  }
}
