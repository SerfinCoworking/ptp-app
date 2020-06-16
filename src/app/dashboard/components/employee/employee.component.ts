import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '@dashboard/services/employee.service';
import { panelOne, panelTwo } from '@shared/animations/wrapper-content';
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
  isVisibleForm: boolean;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.employeeService.isVisibleForm.subscribe( isVisible => this.isVisibleForm = isVisible)
    );
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
