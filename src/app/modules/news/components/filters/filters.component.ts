import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INewsConcept } from '@shared/models/news';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass']
})
export class FiltersComponent implements OnInit {
  @Input() concepts: INewsConcept[];
  @Output() filtersEmitter: EventEmitter<any> = new EventEmitter;

  newsFilter: FormGroup = this.fBuilder.group({
		concept: [""],
		employee: [""],
		dateFrom: [""],
    dateTo: [""]
	});

  faTimes = faTimes;

  constructor(private fBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newsFilter.valueChanges.subscribe((form) => {
      const dateFrom = form.dateFrom ? form.dateFrom.format("YYYY-MM-DD") : '';
      const dateTo = form.dateTo ? form.dateTo.format("YYYY-MM-DD") : '';
      this.filtersEmitter.emit({
        concept: form.concept ? form.concept : '', 
        employee: form.employee ? form.employee : '',
        dateFrom, 
        dateTo
      });
    });
  }

  resetFilters(): void{
    this.newsFilter.reset();
  }
}
