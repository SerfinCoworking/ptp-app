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
    dateTo: [undefined, Validators.required],
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
  calendarDatesError: string;
  employeeError: string;
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
    this.newsService.createOrUpdate(this.news, this.news._id).subscribe(
      (res) => {
        this.router.navigate(['/dashboard/novedades']);
      },
      (resErr) => {
        resErr.error.map((e,index) => {
          if(e.property === 'concept.key'){
            this.newsForm.get('concept').setErrors({
              'unique': e.message
            });
            this.calendarDatesError = e.message;
          }
          if(e.property === 'dateFrom'){
            this.newsForm.get('dateFrom').setErrors({
              'required': e.message
            });
            this.calendarDatesError = e.message;
          }
          if(e.property === 'employee'){
            this.newsForm.get('employee').setErrors({
              'employee': e.message
            });
            this.employeeError = e.message;
          }
        });
        console.log(resErr, "<======= errors");
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

