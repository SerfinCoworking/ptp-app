import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'employee-submenu',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  showForm: boolean = false;
  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.subscription.add(this.route.data.subscribe(data => {
      this.showForm = typeof(data.form) === 'boolean' ? data.form : false;
    }));
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
