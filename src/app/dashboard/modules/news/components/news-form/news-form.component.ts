import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IEmployee } from '@interfaces/employee';
import { EmployeeService } from '@dashboard/services/employee.service';
import { NewsService } from '@dashboard/services/news.service';
import INews, { INewsConcept } from '@interfaces/news';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@root/environments/environment';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';


@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.sass']
})
export class NewsFormComponent implements OnInit {

  // @ViewChild('selreason', {static: true}) reasonsSelect: MatSelect
  
  hoveredDate: NgbDate | null = null;
  initCalendar: {year: number, month: number};
  rangeFromDate: NgbDate;
  rangeToDate: NgbDate | null = null;
  newsForm: FormGroup;
  isLoading: boolean = false; 
  faSpinner = faSpinner;  
  faTimes = faTimes;
  employees: IEmployee[] = [];
  options: IEmployee[];
  newsConcepts: INewsConcept[] = [];
  coneptOptions: INewsConcept[];
  rendered: boolean = false;
  reasonOptions: any = [
    {
      key: "FALLEC_ESPOSA_HIJOS_PADRES",
      name: "Fallecimiento de esposa, hijos o padres",
    },
    {
      key: "FALLEC_SUEGROS_HERMANOS",
      name: "Fallecimiento de suegros o hermanos",
    },
    {
      key: "NAC_HIJO_ADOPCION",
      name: "Nacimiento de hijo o adopción",
    },
    {
      key: "FALLEC_YERNO_NUERA",
      name: "Fallecimiento de yerno o nuera",
    },
    {
      key: "MATRIMONIO",
      name: "Matrimonio",
    },
    {
      key: "EXAMEN",
      name: "Exámenes",
    },
    {
      key: "EMFERMEDAD",
      name: "Emfermedad"
    }  
  ];
  showImport: boolean = false;
  showReasons: boolean = false;
  showFeriado: boolean = false;
  showCapacitaciones: boolean = false;
  showLink: boolean = false;

  notMatchEmployeeList: string[] = [];
  selectedEmployees: IEmployee[] = [];
  selectedEmployeesIds: string[] = [];// ctrl var, for check / uncheck employee list
  value: string;


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
      if(value.key){
        // If is "Adelanto" concept, should select an amount
        this.showImport = value.key === environment.CONCEPT_ADELANTO;
        
        if(this.showImport){
          this.import.setValidators([
            Validators.required
          ]);
        }else{
          this.import.setErrors({required: null});
          this.import.clearValidators();
          this.import.updateValueAndValidity();
        }
        
        // If is "Licencia justificada" should select a reason
        this.showReasons = value.key === environment.CONCEPT_LIC_JUSTIFICADA;
        
        if(this.showReasons){
          this.reason.setValidators([
            Validators.required
          ]);
        }else{
          this.reason.setErrors({required: null});
          this.reason.clearValidators();
          this.reason.updateValueAndValidity();
        }
       
        this.showFeriado = value.key === environment.CONCEPT_FERIADO;
        this.showCapacitaciones = value.key === environment.CONCEPT_CAPACITACION;
        this.showLink = value.key === environment.CONCEPT_EMBARGO;
        
        if(this.showCapacitaciones){
          // If is "Capacitaciones" should select a/an employee
          this.employeeMultiple.setValidators([
            Validators.required
          ]);
          this.employeeMultiple.setValue(this.selectedEmployees) 
          
          this.capacitationHours.setValidators([
            Validators.required
          ]);
        }else{
          this.employeeMultiple.setErrors({required: null});
          this.employeeMultiple.clearValidators();
          this.employeeMultiple.updateValueAndValidity();
          
          this.capacitationHours.setErrors({required: null});
          this.capacitationHours.clearValidators();
          this.capacitationHours.updateValueAndValidity();
        }
        
        if(!this.showFeriado && !this.showCapacitaciones){
          // If isn't "Feriado" should select an employee
          this.employee.setValidators([
            Validators.required
          ]);
        }else{
          this.employee.setErrors({required: null});
          this.employee.clearValidators();
          this.employee.updateValueAndValidity();
        }
          
      }
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
      employeeMultiple: [''],
      concept: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      reason: [''],
      import: [''],
      capacitationHours: [''],
      observation: [''],
      docLink: ['']
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
      employee: news.employee,
      concept: news.concept,
      dateFrom: news.dateFrom,
      dateTo: news.dateTo,
      import: news.import,
      reason: news.reason?.key,
      capacitationHours: news.capacitationHours,
      observation: news.observation,
      docLink: news.docLink
    });
    this.selectedEmployees = news.employeeMultiple;
    this.selectedEmployeesIds = this.selectedEmployees.map((employee: IEmployee) => {
      return employee._id
    });
    this.initCalendar = {year: moment(news.dateFrom).year(), month: parseInt(moment(news.dateFrom).format("M"))}; 
    this.employeeMultiple.setValue(this.selectedEmployees);
  }
  
  
  onSubmit():void{
    if(this.newsForm.valid){
    
      let news: INews = <INews> {
        dateFrom: this.dateFrom.value,
        dateTo: this.dateTo.value,
        concept: this.concept.value,
        observation: this.observation.value,
        docLink: this.docLink.value
      }

      if(this.newsForm.get('_id').value){
        news = Object.assign({_id: this.newsForm.get('_id').value}, news);
      }
      // not "feriado" and "capacitaciones", set employee
      if(![environment.CONCEPT_FERIADO, environment.CONCEPT_CAPACITACION].includes(this.concept.value.key) ){
        news = Object.assign({employee: this.employee.value}, news);
      }
      
      // is "capacitaciones", set employeeMultiple
      if(![environment.CONCEPT_FERIADO, environment.CONCEPT_BAJA, environment.CONCEPT_VACACIONES].includes(this.concept.value.key) ){
        news = Object.assign({acceptEventAssign: true}, news);
      }
      
      // not "feriado", "baja", "vaciones" and "vaciones sin gose de sueldo" set employeeMultiple
      if([environment.CONCEPT_CAPACITACION].includes(this.concept.value.key) ){
        news = Object.assign({employeeMultiple: this.employeeMultiple.value}, news);
        news = Object.assign({capacitationHours: this.capacitationHours.value}, news);
      }
      

      if([environment.CONCEPT_BAJA].includes(this.concept.value.key)){
        news = Object.assign({acceptEmployeeUpdate: true}, news);
      }
      
      if([environment.CONCEPT_ADELANTO].includes(this.concept.value.key)){
        news = Object.assign({import: this.import.value}, news);
      }
      
      if([environment.CONCEPT_LIC_JUSTIFICADA].includes(this.concept.value.key)){
        const selectedOption = this.reasonOptions.find((reason) => { return reason.key === this.reason.value});
        news = Object.assign({reason: selectedOption}, news);
      }

      this.newsService.createOrUpdate(news, news._id).subscribe((res) => {
        this.router.navigate(['/dashboard/novedades']);
      });
    }
  }

  get employee(): AbstractControl {
    return this.newsForm.get('employee');
  }
  get employeeMultiple(): AbstractControl {
    return this.newsForm.get('employeeMultiple');
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
  get capacitationHours(): AbstractControl {
    return this.newsForm.get('capacitationHours');
  }
  get observation(): AbstractControl {
    return this.newsForm.get('observation');
  }
  get docLink(): AbstractControl {
    return this.newsForm.get('docLink');
  }


  private _filter(value: IEmployee | string): IEmployee[] {
    if(typeof(value) === 'string'){
      const filterValue = value.toLowerCase();
      return this.employees.filter((employee: IEmployee) => {
        return (employee.profile.firstName.toLowerCase().includes(filterValue) || employee.profile.lastName.toLowerCase().includes(filterValue)) 
      });      
    }
    return this.employees;
  }

  displayFn(employee: IEmployee | string): string {
    if(typeof(employee) !== 'string'){
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

  applyFilterEvent(event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.applyFilter(filterValue);
  }

  applyFilter(filterValue: string): void {
    if(!filterValue.length){
      this.notMatchEmployeeList = [];
    } // when nothing has typed*/
    if (typeof filterValue === 'string') {

      this.notMatchEmployeeList = this.employees.filter((employee: IEmployee) => {
        const fullname: string = employee.profile.firstName.trim().toLowerCase() + employee.profile.lastName.trim().toLowerCase();
        // at least one word match in firstName or lastName
        const words: string[] = filterValue.trim().split(" ");
        const matches = words.filter( (word: string) => {
          return fullname.includes(word);
        });

        return matches.length == 0; //return employees do not matched
      }).map((employee: IEmployee) => {return employee._id});
    }
  };

  // clean filter list
  clearFilter(): void{
    this.value = "";
    this.applyFilter("");
  }

  trackByEmpId(index: number, employee: IEmployee): string {
    return employee._id;
  }

  selectionChangeHandler(e){
    this.selectedEmployees = e.source.selectedOptions.selected.map((option) => {
      return option.value;  
    });
    this.selectedEmployeesIds = this.selectedEmployees.map((employee: IEmployee) => {
      return employee._id
    });
    this.employeeMultiple.setValue(this.selectedEmployees);
  }
}

