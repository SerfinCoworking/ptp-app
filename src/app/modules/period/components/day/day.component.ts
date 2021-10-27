import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EmployeeIndicatorComponent } from '@shared/components/employee-indicator/employee-indicator.component';
import { IMonitorEmployee } from '@shared/models/plannig';
import moment from 'moment';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit{

  @Input() toDay: moment.Moment;
  @Input() date: string;
  @Input() dayEvents: Array<IMonitorEmployee>;
  @ViewChildren(EmployeeIndicatorComponent)
  indicators: QueryList<EmployeeIndicatorComponent>
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      if(this.indicators.toArray() && this.indicators.toArray().length > 4 ){
        const left: number = 100 / (this.indicators.toArray().length);
        this.indicators.toArray().map((indicator, index) => {
          indicator.left = index == 0 ? "0%" : `calc(${left * index}% )`;
          indicator.position = "absolute";
        });
      }
    });
  }

}
