import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEmployee } from '@shared/models/employee';
import { IPeriod, IShift } from '@shared/models/schedule';
import { PeriodService } from '@shared/services/period.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {

  @Input() period: IPeriod;
  @Output() addEmployeeEvent: EventEmitter<any> = new EventEmitter();

  findEmployeeForm: FormGroup = this.fBuild.group({
    employee: ['']
  });

  filteredEmployees: Array<IEmployee> = [];
  shift: IShift | undefined;

  constructor(private fBuild: FormBuilder, private periodService: PeriodService) { }

  ngOnInit(): void {
    this.findEmployeeForm.valueChanges.subscribe((form) => {
      if(typeof form.employee === 'string' && form.employee.length > 3){
        this.periodService.getEmployeesForPlanning(this.period._id, this.period.fromDate, this.period.toDate, form.employee).subscribe((res) => {
          this.filteredEmployees = res;
        });
        this.shift = undefined;
      }else{
        this.shift = {
          employee: form.employee.employee,
          events: []
        };
      }
    });
  }

  displayEmployee(shift: any){
    if(typeof(shift.employee) !== 'string'){
      return shift.employee ? `${shift.employee.lastName} ${shift.employee.firstName}` : '';
    }
  }

  addEmployee(){
    this.periodService.addEmployee(this.period._id, this.shift).subscribe((res) => {
      this.addEmployeeEvent.emit(this.findEmployeeForm.value.employee);
      this.findEmployeeForm.reset({employee: ''});
      this.filteredEmployees = [];
    });
  }

}
