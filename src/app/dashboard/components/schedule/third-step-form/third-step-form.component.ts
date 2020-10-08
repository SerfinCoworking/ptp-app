import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { IEmployee } from '@interfaces/employee';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IPeriod, IShift } from '@interfaces/schedule';

@Component({
  selector: 'app-third-step-form',
  templateUrl: './third-step-form.component.html',
  styleUrls: ['./third-step-form.component.sass']
})
export class ThirdStepFormComponent implements OnInit {
  @Output() nextStepEvent = new EventEmitter();
  @Output() periodEvent = new EventEmitter();
  @Input() period: IPeriod | null;
  @Input() shifts: IShift[] | null;
  notMatchEmployeeList: string[] = [];
  selectedEmployees: IEmployee[] = [];
  value: string;
  faTimes = faTimes;
  isLoading: boolean = false;
  faSpinner = faSpinner;

  constructor(private scheduleService: ScheduleService) { }

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

      this.notMatchEmployeeList = this.shifts.filter((shift: IShift) => {
        const fullname: string = shift.employee.firstName.trim().toLowerCase() + shift.employee.lastName.trim().toLowerCase();
        // at least one word match in firstName or lastName
        const words: string[] = filterValue.trim().split(" ");
        const matches = words.filter( (word: string) => {
          return fullname.includes(word);
        });

        return matches.length == 0; //return employees do not matched
      }).map((shift: IShift) => {return shift.employee._id});
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
      this.isLoading = true;
      this.scheduleService.createShifts(this.period._id, this.selectedEmployees).subscribe(res => {
        this.isLoading = false;
        this.periodEvent.emit(res);
        this.nextStepEvent.emit();
      })
    }
  }

}
