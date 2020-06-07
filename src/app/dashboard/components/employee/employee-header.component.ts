import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@dashboard/services/employee.service';

@Component({
  selector: 'employee-submenu',
  templateUrl: './employee-header.component.html'
})
export class EmployeeHeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(private activatedRouter: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.subscription.add(this.activatedRouter.data.subscribe((data: {employeeIsLoaded: boolean}) => {
      console.log(data);
    }))
    // this.subscription.add(this.employeeService.getEmployees().subscribe());
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
