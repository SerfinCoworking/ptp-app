import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IEmployee } from '@interfaces/employee';
import { EmployeeService } from '@dashboard/services/employee.service';
import { NewsService } from '@dashboard/services/news.service';
import INews, { INewsConcept } from '@interfaces/news';
import { ActivatedRoute, Router } from '@angular/router';


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
  options: IEmployee[];
  newsConcepts: INewsConcept[] = [];
  coneptOptions: INewsConcept[];
  rendered: boolean = false;


  constructor(
    private fBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.employeeService.getEmployees('', '', 1, 100).subscribe((res) => {
      this.employees = res.docs;
      this.options = res.docs;
    });
    
    this.newsService.getNewsConcept().subscribe((res) => {
      this.newsConcepts = res;
      this.coneptOptions = res;
    });

    this.initForm();
    
    // filter employee autocomplete
    this.employee.valueChanges.subscribe( (value) => {
      this.options = this._filter(value);
    });
    
    this.concept.valueChanges.subscribe( (value) => {
      this.coneptOptions = this._filterConcept(value);
    });

    this.initCalendar = {year: moment().year(), month: parseInt(moment().format("M"))}; 

    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.newsService.getNew(id).subscribe((res) => {
        this.editNews(res);
        const fromRange = moment(res.dateFrom);
        const toRange = moment(res.dateTo);
        this.rangeFromDate = new NgbDate(fromRange.year(), parseInt(fromRange.format("M")), parseInt(fromRange.format("D"))); 
        this.rangeToDate = new NgbDate(toRange.year(), parseInt(toRange.format("M")), parseInt(toRange.format("D")));
        this.rendered = true;
      });
    }else{
      this.rendered = true;
    }
  }

  initForm():void{
    this.newsForm =  this.fBuilder.group({
      _id: [''],
      employee: [''],
      concept: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      reason: [''],
      import: [''],
      observation: ['']
    });
  }

   // period selection
   onDateSelection(date: NgbDate) {
    let fromDate: moment.Moment;
    if (!this.rangeFromDate && !this.rangeToDate) {
      this.rangeFromDate = date;
      fromDate = moment().set({'year': date.year, 'month': (date.month - 1), 'date': date.day});
      this.dateFrom.setValue(fromDate.format('YYYY-MM-DD'));
      this.dateTo.setValue(fromDate.format('YYYY-MM-DD'));
    } else if (this.rangeFromDate && !this.rangeToDate && date.after(this.rangeFromDate)) {
      this.rangeToDate = date;
      const toDate = moment().set({'year': date.year, 'month': (date.month - 1), 'date': date.day});
      this.dateTo.setValue(toDate.format("YYYY-MM-DD"));
    } else {
      this.rangeToDate = null;
      this.rangeFromDate = date;
      fromDate = moment().set({'year': date.year, 'month': (date.month - 1), 'date': date.day});
      this.dateFrom.setValue(fromDate.format("YYYY-MM-DD"));
      this.dateTo.setValue(fromDate.format("YYYY-MM-DD"));
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
  // set news DB values on the form
  editNews(news: INews) {
    this.newsForm.patchValue({
      _id: news._id,
      employee: news.target,
      concept: news.concept,
      dateFrom: news.dateFrom,
      dateTo: news.dateTo,
      reason: news.reason,
      import: news.import,
      observation: news.observation
    });
  }

  
  onSubmit():void{
    let news: INews = <INews> {
      dateFrom: this.dateFrom.value,
      dateTo: this.dateTo.value,
      concept: this.concept.value,
      observation: this.observation.value
    }

    if(this.newsForm.get('_id').value){
      news = Object.assign({_id: this.newsForm.get('_id').value}, news);
    }
    
    if(this.employee.value){
      news = Object.assign({target: this.employee.value}, news);
    }
    
    if(this.concept.value.key.includes('FERIADO')){
      news = Object.assign({acceptEventAssign: false}, news);
    }
    
    if(this.concept.value.key.includes('BAJA')){
      news = Object.assign({acceptEmployeeUpdate: true}, news);
    }
    
    if(this.concept.value.key.includes('ADELANTO')){
      news = Object.assign({import: this.import.value}, news);
    }
    
    if(this.concept.value.key.includes('LIC_JUSTIFICADA')){
      news = Object.assign({reason: this.reason.value}, news);
    }

    this.newsService.createOrUpdate(news, news._id).subscribe((res) => {
      this.router.navigate(['/dashboard/novedades']);
    });
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
  get import(): AbstractControl {
    return this.newsForm.get('import');
  }
  get reason(): AbstractControl {
    return this.newsForm.get('reason');
  }
  get observation(): AbstractControl {
    return this.newsForm.get('observation');
  }


  private _filter(value: IEmployee | string): IEmployee[] {
    if(typeof(value) === 'string'){
      const filterValue = value.toLowerCase();
      return this.employees.filter((employee: IEmployee) => {
        return (employee.profile.firstName.toLowerCase().includes(filterValue) || employee.profile.lastName.toLowerCase().includes(filterValue)) 
      });      
    }
  }

  displayFn(employee: IEmployee | string): string {
    if(typeof(employee) === 'string'){
      return 'Todos';
    }else{
      return employee ? `${employee.profile.firstName} ${employee.profile.lastName}` : '';
    }
  }

  private _filterConcept(value: INewsConcept | string): INewsConcept[] {
    if(typeof(value) === 'string'){
      const filterValue = value.toLowerCase();
      return this.newsConcepts.filter((concept: INewsConcept) => concept.name.toLowerCase().includes(filterValue) );      
    }
  }
  
  displayFnNewsConcept(concept: INewsConcept | string): string {
    if(typeof(concept) === 'string'){
      return concept;
    }else{
      return concept ? `${concept.name}` : '';
    }
  }
}

