import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { IPeriod, IShift } from '@interfaces/schedule';
import { faSpinner, faCalendarAlt, faPlus, faTimes, faSquare } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PeriodSelectionDialogComponent } from '@dashboard/components/shared/dialogs/period-selection-dialog/period-selection-dialog.component';
import { FormControl } from '@angular/forms';
import { NewsService } from '@dashboard/services/news.service';
import INews from '@interfaces/news';
import { IObjective } from '@interfaces/objective';

@Component({
  selector: 'app-fourth-step-form',
  templateUrl: './fourth-step-form.component.html',
  styleUrls: ['./fourth-step-form.component.sass']
})
export class FourthStepFormComponent implements OnChanges, OnInit {
  @Output() savePeriodEvent: EventEmitter<IPeriod> = new EventEmitter();
  @Output() updatePeriodRangeEvent: EventEmitter<any> = new EventEmitter();
  @Input('period') periodInp: IPeriod | null;
  @Input() shifts: IShift[];
  @Input() objective: IObjective;
  @Input() periodUpdateSelectionError: string | undefined;
  period: IPeriod | null;
  isLoading: boolean = false;

  faSpinner = faSpinner;
  faCalendarAlt = faCalendarAlt;
  faPlus = faPlus;
  faTimes = faTimes;
  faSquare = faSquare;

  periodBuilder: Array<string[]> = [];
  periodWeek: string[] = [];
  xAxis: string = '0';
  xAxisPage: number = 0;
  filteredOptions: IShift[];
  shiftFilter = new FormControl();
  private counter: number = 0;
  showPeriodEdit: boolean;
  news: INews[] = [];

  constructor(private dialog: MatDialog, private newsService: NewsService) { }

  ngOnChanges(changes: SimpleChanges):void {
    if(changes.shifts && changes.shifts.currentValue){

      this.filteredOptions = changes.shifts.currentValue;
      
      this.shiftFilter.valueChanges.subscribe( (value) => {
      this.filteredOptions = this._filter(value);
      });
    }
    if(changes.periodInp && changes.periodInp.currentValue){
      this.periodBuilder = [];
      this.period = changes.periodInp.currentValue;

      let counterDate = moment(this.period.fromDate);
      let toDate = moment(this.period.toDate);

      this.showPeriodEdit = !moment().isBetween(counterDate, toDate) && !moment().isSameOrAfter(toDate);
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
        }else if((this.periodBuilder.length * 7 + this.counter) === (diffInDays + 1)){
          this.periodBuilder.push(this.periodWeek);
        }
        counterDate.add(1, 'day');
      }
      this.newsService.getNewsByDate(this.period.fromDate, this.period.toDate).subscribe((res) => {
        this.news = res;
      });
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
    const index = this.shifts.findIndex((shift: IShift) => {
      return shift.employee._id == this.selectedOption.employee._id;
    });
    this.period.shifts.push(this.selectedOption);
    this.shifts.splice(index, 1);
    this.filteredOptions = this.shifts;
    this.clearFilterOption();
  }

  clearFilterOption(){
    this.shiftFilter.setValue('');
  }

  removeEmployee(index: number){
    this.period.shifts[index].events = [];
    this.shifts.push(this.period.shifts[index]);
    this.filteredOptions = this.shifts;
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

  get selectedOption(): IShift{
    return this.shiftFilter.value;
  }

  private _filter(value: string | IShift): IShift[] {
    const filterValue = typeof(value) === 'string' ? value.toLowerCase(): `${value.employee.firstName} ${value.employee.lastName}`;
    return this.shifts.filter(option => (option.employee.firstName.toLowerCase().includes(filterValue) || option.employee.lastName.toLowerCase().includes(filterValue)));
  }

  displayFn(shift: IShift): string {
    return shift ? `${shift.employee.firstName} ${shift.employee.lastName}` : '';
  }
}

