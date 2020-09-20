import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { IPeriod } from '@interfaces/schedule';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-fourth-step-form',
  templateUrl: './fourth-step-form.component.html',
  styleUrls: ['./fourth-step-form.component.sass']
})
export class FourthStepFormComponent implements OnChanges, OnInit {
  @Output() savePeriodEvent: EventEmitter<IPeriod> = new EventEmitter();
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
      this.periodBuilder = [];
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
    }

  }

  ngOnInit(): void {

  }

  prevWeek(){
    if(this.xAxisPage > 0){
      this.xAxisPage--
      this.xAxis = (this.xAxisPage * -100) + '%';
    }
  }

  nextWeek(){
    if(this.xAxisPage < (this.periodBuilder.length - 1)){
      this.xAxisPage++
      this.xAxis = (this.xAxisPage * -100) + '%';
    }
  }

  saveShifts(): void{
    this.isLoading = true;
    this.savePeriodEvent.emit(this.period);
  }

  addEmployee(){
    this.period.shifts.push({employee: {_id: "1234", firstName: "juan", lastName: "perez"}, events: []});
  }

  removeEmployee(index: number){
    this.period.shifts.splice(index, 1);
  }

  updatePeriodShifts(e, shiftIndex: number){
    this.period.shifts[shiftIndex].events = e;
  }
}
