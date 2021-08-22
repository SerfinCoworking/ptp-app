import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IEmployee } from '@shared/models/employee';
import INews, { INewsConcept } from '@shared/models/news';
import { NewsService } from '@shared/services/news.service';
import { environment as env } from '@root/environments/environment';
import moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  newsForm: FormGroup = this.fBuilder.group({
    _id: [""],
		concept: ["", Validators.required],
		employee: [undefined, Validators.required],
		employeeMultiple: [undefined, Validators.required],
    dateFrom: [moment().format("YYYY-MM-DD"), Validators.required],
    dateTo: [moment().format("YYYY-MM-DD"), Validators.required],
    reason: [""],
    capacitationHours: ["", Validators.required],
    import: [""],
    docLink: [""],
    telegramDate: [""],
    observation: [""]
	});

  news: INews;

  faSpinner = faSpinner;
  isLoading: boolean = false;
  concepts: INewsConcept[] = [];
  calendarDatesErrorMsg: string;
  employeeErrorMsg: string;
  reasonErrorMsg: string;
  importErrorMsg: string;
  employees: IEmployee[] = [];
  reasonOptions: any = env.CONCEPT_LIC_JUS_REASONS;
  
  constructor(private fBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsService: NewsService){}

  ngOnInit():void{
    this.activatedRoute.data.subscribe((data) => {
      this.concepts = data.concepts;
      this.news = data.news;
      this.employees = data.employees;
      if(this.news){
        this.newsForm.reset({
          ...this.news,
          concept: this.news.concept._id,
          reason: this.news.reason?.key
        });
      }
    });
    this.newsForm.get('concept').valueChanges.subscribe((concept) => {
      const selectedConcept = this.concepts.find( c => c._id === concept );

      if(['FERIADO', 'CAPACITACIONES'].includes(selectedConcept.key)){
        this.setEmployee(undefined);
        this.news.employee = undefined;
      }
      if(!['ADELANTO', 'PLUS_RESPONSABILIDAD'].includes(selectedConcept.key)){
        this.newsForm.get('import').setValue(undefined);
        this.news.import = undefined;
      }
      
    })
    this.newsForm.valueChanges.subscribe((form) => {
      this.news = {
        ...form,
        concept: this.concepts.find( c => c._id === form.concept ),
        reason: this.reasonOptions.find( reason => reason.key === form.reason )
      }
    })
  }

  setDates(e):void{
    this.newsForm.get('dateFrom').setValue(e.fromDate.format("YYYY-MM-DD"));
    this.newsForm.get('dateTo').setValue(e.toDate?.format("YYYY-MM-DD") || null);
  }

  onSubmit(): void{
    console.log(this.news);
    this.calendarDatesErrorMsg = undefined;
    this.employeeErrorMsg = undefined;
    this.reasonErrorMsg = undefined;
    this.importErrorMsg = undefined;
    this.newsService.createOrUpdate(this.news, this.news._id).subscribe(
      (res) => {
        this.router.navigate(['/dashboard/novedades']);
      },
      (resErr) => {
        resErr.error.map((e,index) => {
          const error = e.message.split("_");
          if(error[0] === 'CONCEPT'){
            this.newsForm.get('concept').setErrors({
              'unique': error[1]
            });
            this.calendarDatesErrorMsg = error[1];
          }
          if(error[0] === 'DATEFROM'){
            this.calendarDatesErrorMsg = error[1];
          }
          if(error[0] === 'EMPLOYEE'){
            this.employeeErrorMsg = error[1];
          }
          if(error[0] === 'LICJUSTIFICADA'){
            this.reasonErrorMsg = error[1];
          }
          if(['ADELANTO', 'PLUSRESPONSABILIDAD'].includes(error[0])){
            this.importErrorMsg = error[1];
          }
        });
      }
    );
  }

  isInValid(field: string): boolean {
		return !!(
			this.newsForm.controls[field].invalid &&
			this.newsForm.controls[field].touched
		);
	}

  setEmployee(e):void {
    this.newsForm.get('employeeMultiple').reset();
    this.newsForm.get("employee").setValue(e);
  }

  setEmployees(e):void {
    this.newsForm.get('employee').reset();
    this.newsForm.get("employeeMultiple").setValue(e);
  }
}

