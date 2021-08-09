import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import INews, { INewsConcept } from '@shared/models/news';
import { NewsService } from '@shared/services/news.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  newsForm: FormGroup = this.fBuilder.group({
    _id: [""],
		concept: ["", Validators.required],
    dateFrom: ["", Validators.required],
    dateTo: ["", Validators.required],
    observation: [""]
	});

  news: INews;

  faSpinner = faSpinner;
  isLoading: boolean = false;
  concepts: INewsConcept[] = [];
  calendarDatesError: string;
  
  constructor(private fBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsService: NewsService){}

  ngOnInit():void{
    this.activatedRoute.data.subscribe((data) => {
      this.concepts = data.concepts;
      this.news = data.news;
      if(this.news){
        this.newsForm.reset({
          ...this.news,
          concept: this.news.concept._id
        });
      }
    });
    this.newsForm.valueChanges.subscribe((form) => {
      this.news = {
        ...form,
        concept: this.concepts.find( c => c._id === form.concept )
      }
      console.log(this.news);
    })
  }

  setDates(e):void{
    this.newsForm.get('dateFrom').setValue(e.fromDate.format("YYYY-MM-DD"));
    this.newsForm.get('dateTo').setValue(e.toDate?.format("YYYY-MM-DD") || null);
  }

  onSubmit(): void{
    this.newsService.createOrUpdate(this.news).subscribe(
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
}

