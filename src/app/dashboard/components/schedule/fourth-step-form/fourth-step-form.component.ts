import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { IPeriod } from '@interfaces/schedule';
import { faSpinner, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PeriodSelectionDialogComponent } from '@dashboard/components/shared/dialogs/period-selection-dialog/period-selection-dialog.component';

@Component({
  selector: 'app-fourth-step-form',
  templateUrl: './fourth-step-form.component.html',
  styleUrls: ['./fourth-step-form.component.sass']
})
export class FourthStepFormComponent implements OnChanges, OnInit {
  @Output() savePeriodEvent: EventEmitter<IPeriod> = new EventEmitter();
  @Output() updatePeriodRangeEvent: EventEmitter<any> = new EventEmitter();
  @Input('period') periodInp: IPeriod | null;
  period: IPeriod | null;
  isLoading: boolean = false;
  faSpinner = faSpinner;
  faCalendarAlt = faCalendarAlt;
  periodBuilder: Array<string[]> = [];
  periodWeek: string[] = [];
  xAxis: string = '0';
  xAxisPage: number = 0;
  private counter: number = 0;

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges):void {
    if(changes.periodInp && changes.periodInp.currentValue){
      this.periodBuilder = [];
      this.period = changes.periodInp.currentValue;

      let counterDate = moment(this.period.fromDate);
      let toDate = moment(this.period.toDate);
      const diffInDays = toDate.diff(counterDate, 'days');
      this.counter = 0;
      this.periodWeek = [];
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

  changePeriodDates(){    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { period: this.period};

    this.dialog.open(PeriodSelectionDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe((result: any)  => {
      if (result) {
        this.updatePeriodRangeEvent.emit({ periodId: this.period._id, fromDate: moment(result.fromDate).format("YYYY-MM-DD"), toDate: moment(result.toDate).format("YYYY-MM-DD")});
      }
    });
  }
}
