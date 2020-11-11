import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IEmployee } from '@interfaces/employee';


@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.sass']
})
export class NewsFormComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  initCalendar: {year: number, month: number};
  rangeFromDate: NgbDate;
  rangeToDate: NgbDate | null = null;
  newsForm: FormGroup;
  isLoading: boolean = false; 
  faSpinner = faSpinner;  
  employees: IEmployee[] = [];
  concepts: Array<string> = ['Feriado', 'Viatico', 'Licencia justificada', 'Paternidad / Maternidad', 'Vaciones'];

  constructor(private fBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
    this.initCalendar = {year: moment().year(), month: parseInt(moment().format("M"))}; 
  }

  initForm():void{
    this.newsForm =  this.fBuilder.group({
      _id: [''],
      employee: [''],
      concept: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      observation: ['']
    });
  }

   // period selection
   onDateSelection(date: NgbDate) {
    let fromDate: moment.Moment;
    if (!this.rangeFromDate && !this.rangeToDate) {
      this.rangeFromDate = date;
      fromDate = moment().set({'year': date.year, 'month': (date.month - 1), 'date': date.day});
      this.dateFrom.setValue(fromDate.format("DD-MM-YYYY"));
      this.dateTo.setValue(fromDate.format("DD-MM-YYYY"));
    } else if (this.rangeFromDate && !this.rangeToDate && date.after(this.rangeFromDate)) {
      this.rangeToDate = date;
      const toDate = moment().set({'year': date.year, 'month': (date.month - 1), 'date': date.day});
      this.dateTo.setValue(toDate.format("DD-MM-YYYY"));
    } else {
      this.rangeToDate = null;
      this.rangeFromDate = date;
      fromDate = moment().set({'year': date.year, 'month': (date.month - 1), 'date': date.day});
      this.dateFrom.setValue(fromDate.format("DD-MM-YYYY"));
      this.dateTo.setValue(fromDate.format("DD-MM-YYYY"));
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
   // set employee DB values on the form
  //  editEmployee(employee: IEmployee) {
  //   this.employeeForm.patchValue({
  //     _id: employee._id,
  //     enrollment: employee.enrollment,
  //     rfid: employee.rfid,
  //     profile: employee.profile,
  //     contact: employee.contact
  //   });
  //   const contact: FormGroup = this.employeeForm.get('contact') as FormGroup;
  //   contact.setControl('phones', this.setExistingPhones(employee.contact.phones));
  // }

  onSubmit():void{
    console.log(this.newsForm.value);
  }
  
  get employee(): AbstractControl {
    return this.newsForm.get('employee');
  }
  get concept(): AbstractControl {
    return this.newsForm.get('concept');
  }
  get dateFrom(): AbstractControl {
    return this.newsForm.get('dateFrom');
  }
  get dateTo(): AbstractControl {
    return this.newsForm.get('dateTo');
  }
  get observation(): AbstractControl {
    return this.newsForm.get('observation');
  }
}

