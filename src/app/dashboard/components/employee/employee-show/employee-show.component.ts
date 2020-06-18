import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@dashboard/services/employee.service';
import { IEmployee } from '@interfaces/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-show',
  templateUrl: './employee-show.component.html',
  styleUrls: ['./employee-show.component.sass']
})
export class EmployeeShowComponent implements OnInit {

  employee: IEmployee;
  private subscription: Subscription = new Subscription;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.employeeService.employee.subscribe(
        employee => {
          this.employee = employee;
        }
      )
    );
  }

  closeShow(): void{
    this.employeeService.hideEmployee();
  }

}
