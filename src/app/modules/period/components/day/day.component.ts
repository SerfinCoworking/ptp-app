import { Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { EmployeeIndicatorComponent } from '@shared/components/employee-indicator/employee-indicator.component';
import { IMonitorEmployee } from '@shared/models/plannig';
import moment from 'moment';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnChanges{

  @Input() toDay: moment.Moment;
  @Input() date: string;
  @Input() byMonth: string;
  @Input() dayEvents: Array<IMonitorEmployee>;
  @ViewChildren(EmployeeIndicatorComponent)
  indicators: QueryList<EmployeeIndicatorComponent>
  events: Array<IMonitorEmployee> = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.byMonth && changes.byMonth.currentValue){

      this.events = changes.byMonth.currentValue === 'yes' ? changes.dayEvents.currentValue.slice(0,6) : changes.dayEvents.currentValue;
      setTimeout(() => {
        if(this.indicators.toArray().length > 4 && changes.byMonth.currentValue === 'yes'){
          const left: number = 100 / (this.indicators.toArray().length);
          this.indicators.toArray().map((indicator, index) => {
            indicator.left = index == 0 ? "0%" : `calc(${left * index}% )`;
            indicator.position = "absolute";
            indicator.zIndex = (index + 1).toString();
          });
        }else{
          this.indicators.toArray().map((indicator, index) => {
            indicator.position = "relative";
          });
        }
      });
    }
  }

}
