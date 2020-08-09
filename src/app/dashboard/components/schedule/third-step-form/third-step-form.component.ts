import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { IEmployee } from '@interfaces/employee';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IPeriod } from '@interfaces/schedule';

@Component({
  selector: 'app-third-step-form',
  templateUrl: './third-step-form.component.html',
  styleUrls: ['./third-step-form.component.sass']
})
export class ThirdStepFormComponent implements OnChanges, OnInit {
  @Output() nextStepEvent = new EventEmitter();
  @Output() periodEvent = new EventEmitter();
  @Input('period') periodInp: IPeriod | null;
  @Input() employeeList: IEmployee[] | null;
  period: IPeriod | null;
  notMatchEmployeeList: string[] = [];
  selectedEmployees: IEmployee[] = [];
  value: string;
  faTimes = faTimes;
  isLoading: boolean = false;
  faSpinner = faSpinner;

  constructor(private scheduleService: ScheduleService) { }

  ngOnChanges(changes: SimpleChanges):void {
    if(changes.periodInp && changes.periodInp.currentValue) this.period = changes.periodInp.currentValue;
  }

  ngOnInit(): void {
  }


  applyFilterEvent(event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.applyFilter(filterValue);

  }

  applyFilter(filterValue: string): void {
    if(!filterValue.length){
      this.notMatchEmployeeList = [];
    } // when nothing has typed*/
    if (typeof filterValue === 'string') {

      this.notMatchEmployeeList = this.employeeList.filter((employee: IEmployee) => {
        const fullname: string = employee.profile.firstName.trim().toLowerCase() + employee.profile.lastName.trim().toLowerCase();
        // at least one word match in firstName or lastName
        const words: string[] = filterValue.trim().split(" ");
        const matches = words.filter( (word: string) => {
          return fullname.includes(word);
        });

        return matches.length == 0; //return employees do not matched
      }).map((employee: IEmployee) => {return employee._id});
    }
  };

  // clean filter list
  clearFilter(): void{
    this.value = "";
    this.applyFilter("");
  }

  trackByEmpId(index: number, employee: IEmployee): string {
      return employee._id;
  }

  selectionChangeHandler(e){
    this.selectedEmployees = e.source.selectedOptions.selected.map((option) => {
      return option.value;
    });

  }

  submitShiftForm(){
    if(this.selectedEmployees.length){
      this.scheduleService.createShift(this.period._id, this.selectedEmployees).subscribe(res => {
        this.isLoading = true;
        this.periodEvent.emit(res.period);
        this.nextStepEvent.emit();
      })
    }
  }

}
