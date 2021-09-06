import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass']
})
export class FiltersComponent implements OnInit {
  @Output() filtersEmitter: EventEmitter<any> = new EventEmitter;

  filterForm: FormGroup = this.fBuilder.group({
		name: [""],
		dateFrom: [""],
    dateTo: [""]
	});

  faTimes = faTimes;

  constructor(private fBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe((form) => {
      const dateFrom = form.dateFrom ? form.dateFrom.format("YYYY-MM-DD") : '';
      const dateTo = form.dateTo ? form.dateTo.format("YYYY-MM-DD") : '';
      this.filtersEmitter.emit({
        name: form.name, 
        dateFrom, 
        dateTo
      });
    });
  }

  resetFilters(): void{
    this.filterForm.reset({
      name: ''
    });
  }
}
