import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { IEmployee } from '@interfaces/employee';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-third-step-form',
  templateUrl: './third-step-form.component.html',
  styleUrls: ['./third-step-form.component.sass']
})
export class ThirdStepFormComponent implements OnInit {
  @Output() selectionChangeEvent = new EventEmitter();
  @Input() employeeList: IEmployee[] | null;
  notMatchEmployeeList: string[] = [];
  value: string;
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  selectionChangeHandler(e){
    this.selectionChangeEvent.emit(e);
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

}
