import { Component, OnInit } from '@angular/core';
import { IEmployee } from '@shared/models/employee';
import { faUserCircle, faPen, faSpinner, faIdCardAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@shared/services/employee.service';

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
  faIdCardAlt = faIdCardAlt;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
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

