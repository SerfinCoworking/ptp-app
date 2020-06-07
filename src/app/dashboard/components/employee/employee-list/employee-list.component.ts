import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from '@dashboard/services/employee.service';
import { IEmployee } from '@interfaces/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['fullName', 'dni', 'email', 'phone'];
  dataSource: MatTableDataSource<IEmployee[]>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {

    this.subscription.add(this.employeeService.employees.subscribe(
      employees => {
        this.dataSource = new MatTableDataSource<any>(employees);
        this.dataSource.paginator = this.paginator;
      }
    ));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}



