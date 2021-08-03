import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { INewsConcept } from '@shared/models/news';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  newsForm: FormGroup = this.fBuilder.group({
		concept: ["", Validators.required],
    dateFrom: ["", Validators.required],
    dateTo: ["", Validators.required],
    observation: [""]
	});

  faSpinner = faSpinner;
  isLoading: boolean = false;
  concepts: INewsConcept[] = [];
  constructor(private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute){}

  ngOnInit():void{
    this.activatedRoute.data.subscribe((data) => {
      this.concepts = data.concepts;
    });
    this.newsForm.get('concept').valueChanges.subscribe((concept) => {
      // console.log(concept);
    })
  }

  setDates(e):void{
    this.newsForm.get('dateFrom').setValue(e.fromDate);
    this.newsForm.get('dateTo').setValue(e.toDate);
  }
}

