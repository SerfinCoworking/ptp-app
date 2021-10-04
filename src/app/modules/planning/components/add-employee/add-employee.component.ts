import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEmployee } from '@shared/models/employee';
import { IPeriod } from '@shared/models/schedule';
import { PeriodService } from '@shared/services/period.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {

  @Input() period: IPeriod;

  findEmployeeForm: FormGroup = this.fBuild.group({
    employee: ['']
  });

  filteredEmployees: Array<IEmployee> = [];

  constructor(private fBuild: FormBuilder, private periodService: PeriodService) { }

  ngOnInit(): void {
    this.findEmployeeForm.valueChanges.subscribe((form) => {
      if(form.employee.length > 3){
        this.periodService.getEmployeesForPlanning(this.period.fromDate, this.period.toDate, form.employee).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

}
