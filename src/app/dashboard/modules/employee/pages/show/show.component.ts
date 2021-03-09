import { Component, OnInit } from '@angular/core';
import { IEmployee } from '@interfaces/employee';
import { faUserCircle, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@dashboard/services/employee.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})

export class ShowComponent implements OnInit {
  employee: IEmployee | null;
  faUserCircle = faUserCircle;
  faPen = faPen;
  faSpinner = faSpinner;
  active = 1;
  isLoading: boolean = false;

  constructor( private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.employee = data.employee;
    });
  }
}

