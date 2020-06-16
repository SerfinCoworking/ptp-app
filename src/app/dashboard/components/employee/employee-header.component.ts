import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@dashboard/services/employee.service';

@Component({
  selector: 'employee-submenu',
  templateUrl: './employee-header.component.html'
})
export class EmployeeHeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.employeeService.showForm
    );
  }

  openForm(): void{
    this.employeeService.showForm();
  }

  closeForm(): void{
    this.employeeService.hideForm();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
