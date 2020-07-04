import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '@dashboard/services/employee.service';
import { panelOne, panelTwo } from '@shared/animations/wrapper-content';
import { IEmployee } from '@interfaces/employee';
@Component({
  selector: 'employee-submenu',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass'],
  animations: [
    panelOne,
    panelTwo
  ]
})
export class EmployeeComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  isVisibleShow: boolean = false;
  employee: IEmployee | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void { }

  showEmployee(employeeId: string){
    this.subscription.add(
      this.employeeService.getEmployee(employeeId).subscribe(
        (employee: IEmployee) => {
          this.employee = employee;
          this.isVisibleShow = true;
        }
      )
    );
  }

  hideEmployee(){
    this.employee = null;
    this.isVisibleShow = false;
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
