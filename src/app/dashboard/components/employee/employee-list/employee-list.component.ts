import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from '@dashboard/services/employee.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'dni', 'email', 'phone'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private employeeServie: EmployeeService) { }

  ngOnInit(): void {

    this.employeeServie.getEmployees().subscribe(
      employees => {
        this.dataSource = new MatTableDataSource<any>(employees);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

}



