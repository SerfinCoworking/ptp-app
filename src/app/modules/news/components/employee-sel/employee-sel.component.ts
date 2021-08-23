import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IEmployee } from '@shared/models/employee';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-sel',
  templateUrl: './employee-sel.component.html',
  styleUrls: ['./employee-sel.component.sass']
})
export class EmployeeSelComponent implements OnInit, OnChanges {

  @Input() conceptKey: string;
  @Input() employees: IEmployee[] = [];
  @Input() storedEmployee: IEmployee;
  @Input() storedEmployees: IEmployee[];
  @Input() employeeErrorMsg: string;
  @Input() employeeMultiErrorMsg: string;
  @Output() selectEmployeeEvent: EventEmitter<any> = new EventEmitter;
  @Output() selectMultiEmployeeEvent: EventEmitter<any> = new EventEmitter;
  multi: boolean = false;
  
  notMatchEmployeeList: string[] = [];
  selectedEmployees: IEmployee[] = [];
  selectedEmployeesIds: string[] = [];// ctrl var, for check / uncheck employee list
  value: string;
  faTimes = faTimes;
  employee: IEmployee;

  employeeControl = new FormControl();
  filteredEmployeeOptions: IEmployee[];
  private multiConcepts: string[] = ['CAPACITACIONES'];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.conceptKey && changes.conceptKey.currentValue){
      this.multi = this.multiConcepts.includes(changes.conceptKey.currentValue);
    }
  }
  ngOnInit(): void {
    this.employeeControl.reset(this.storedEmployee);
    if(this.storedEmployees){
      this.selectedEmployees = this.storedEmployees;
      this.selectedEmployeesIds = this.storedEmployees.map((employee: IEmployee) => {
        return employee._id
      });
    }
    this.employeeControl.valueChanges.subscribe((value) => {
      this.filteredEmployeeOptions = this._filter(value);
    });
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

      this.notMatchEmployeeList = this.employees.filter((employee: IEmployee) => {
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

  displayEmployee(employee: IEmployee | string): string {
    if(typeof(employee) !== 'string'){
      return employee ? `${employee.profile.firstName} ${employee.profile.lastName}` : '';
    }
  }

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
    this.selectedEmployeesIds = this.selectedEmployees.map((employee: IEmployee) => {
      return employee._id
    });
    this.selectMultiEmployeeEvent.emit(this.selectedEmployees);
    // this.employeeMultiple.setValue(this.selectedEmployees);
  }

  private _filter(value: IEmployee | string): IEmployee[] {
    
    if(typeof(value) === 'string'){
      const filterValue = value.toLowerCase();
      return this.employees.filter((employee: IEmployee) => {
        return (employee.profile.firstName.toLowerCase().includes(filterValue) || employee.profile.lastName.toLowerCase().includes(filterValue)) 
      });      
    }else{
      this.selectEmployeeEvent.emit(this.employeeControl.value);
    }
    return this.employees;
  }
}
