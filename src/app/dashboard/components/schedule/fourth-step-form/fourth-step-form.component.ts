import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IEmployee } from '@interfaces/employee';
import { IPeriod } from '@interfaces/schedule';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fourth-step-form',
  templateUrl: './fourth-step-form.component.html',
  styleUrls: ['./fourth-step-form.component.sass']
})
export class FourthStepFormComponent implements OnChanges, OnInit {
  @Input('period') periodInp: IPeriod | null;
  period: IPeriod | null;
  isLoading: boolean = false;
  faSpinner = faSpinner;
  constructor() { }

  ngOnChanges(changes: SimpleChanges):void {
    if(changes.periodInp && changes.periodInp.currentValue) this.period = changes.periodInp.currentValue;
  }

  ngOnInit(): void {
  }

}
