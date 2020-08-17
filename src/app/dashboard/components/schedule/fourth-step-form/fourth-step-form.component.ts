import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IEmployee } from '@interfaces/employee';
import { IPeriod } from '@interfaces/schedule';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

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
  periodBuilder: Array<string[]> = [];
  periodWeek: string[] = [];
  xAxis: string = '0';
  xAxisPage: number = 0;

  private counter: number = 0;
  constructor() { }

  ngOnChanges(changes: SimpleChanges):void {
    if(changes.periodInp && changes.periodInp.currentValue){
      this.period = changes.periodInp.currentValue;

      let counterDate = moment(this.period.fromDate);
      let toDate = moment(this.period.toDate);
      const diffInDays = toDate.diff(counterDate, 'days');
      while(counterDate.isSameOrBefore(toDate)){
        this.counter++;
        this.periodWeek.push(counterDate.format('YYYY-MM-DD'));
        if(this.counter === 7){
          this.counter = 0;
          this.periodBuilder.push(this.periodWeek);
          this.periodWeek = [];
        }else if((this.periodBuilder.length * 7 + this.counter) === diffInDays){

          this.periodBuilder.push(this.periodWeek);

        }
        counterDate.add(1, 'day');
      }
      console.log(this.periodBuilder, "====================DEBUG", diffInDays);
    }

  }

  ngOnInit(): void {

  }

  prevWeek(){
    if(this.xAxisPage > 0){
      this.xAxisPage--
      this.xAxis = (this.xAxisPage * -100) + '%';
    }
    console.log(this.xAxis);

  }
  nextWeek(){
    if(this.xAxisPage < (this.periodBuilder.length - 1)){
      this.xAxisPage++
      this.xAxis = (this.xAxisPage * -100) + '%';
    }
    console.log(this.xAxis);
  }

  // setShift(e, shift){
  //   console.log(e, shift, "====================DEBUG");
  // }

  addEmployee(){
    this.period.shifts.push({employee: {_id: "1234", firstName: "juan", lastName: "perez"}, events: []});
  }
}
