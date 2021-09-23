import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from '@shared/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit {

  @Input() employee: any;
  @Input() totalHs: number;
  @Input() weeks: Array<any>;
  maxHours: number = 48;

  constructor() { }

  ngOnInit(): void {
  }

}
