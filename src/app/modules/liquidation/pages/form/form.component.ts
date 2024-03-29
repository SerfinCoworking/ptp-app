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

  faSpinner = faSpinner;
  faTrashAlt = faTrashAlt;
  faEye = faEye;
  isLoading: boolean = false;
  rangeError: string = '';
  employeeErrorMsg: string = '';
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
    name: [""],
    observation: [""],
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
      this.employees = data.employees;
      
      if(data.liquidation){
        this.liquidation = data.liquidation;
        this.selectedEmployees = data.liquidation.liquidatedEmployees.map((liqEmployee) => liqEmployee.employee);
      }else{
        this.selectedEmployees = data.employees;
      }
    });

    this.liquidationForm.reset({
      ...this.liquidation,
      employeeIds: this.selectedEmployees.map((employee) => employee._id),
      fromDate: this.liquidation?.dateFrom,
      toDate: this.liquidation?.dateTo,
    });

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
  }

  selectRange(index: number){
    this.liquidationForm.get('fromDate').setValue(this.months[index].from.format("YYYY-MM-DD"));
    this.liquidationForm.get('toDate').setValue(this.months[index].to.format("YYYY-MM-DD"));
  }

  // period selection
  

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
    this.isLoading = true;
    this.liquidationService.createOrUpdate(this.liquidationForm.value).subscribe((res) => {
      const id: string = res.liquidation._id;
      if(res) this.router.navigate([`/dashboard/liquidacion/${id}`]);
    },
    (err) => {
      this.isLoading = false;
      const error = err.error[0].message.split("_");
      this.rangeError = '';
      this.employeeErrorMsg = '';
      if(error[0] === 'RANGE'){
        this.rangeError = error[1];
      }
      if(error[0] === 'EMPLOYEE'){
        this.employeeErrorMsg = error[1];
      }
    });
  }
}
