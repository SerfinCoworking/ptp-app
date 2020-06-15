import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '@dashboard/services/employee.service';
import { PaginationResult } from '@interfaces/pagination';
import { IEmployee } from '@interfaces/employee';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['fullName', 'profile.dni', 'email', 'phone'];
  employees: MatTableDataSource<IEmployee[]>;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex:number;
  pageSize:number;
  length:number;
  search: string;
  sort: string;
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {

    this.subscription.add(this.employeeService.employees.subscribe(
      (paginatedEmployees: PaginationResult<IEmployee>) => {
        this.employees = new MatTableDataSource<any>(paginatedEmployees.docs);

        this.pageIndex = paginatedEmployees.page - 1;
        this.pageSize = paginatedEmployees.limit;
        this.length = paginatedEmployees.totalDocs;
      }
    ));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getPaginationData(event?:PageEvent): PageEvent{
    this.getData(this.search, this.sort, event.pageIndex, event.pageSize);
    return event;
  }

  getSort(event?:Sort): void{
    this.sort = event.active + "_" + event.direction;
    this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.length > 3 || filterValue.length == 0){
      this.search = filterValue;
      this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
    }
  }

  getData(search: string, sort: string, pageIndex: number, pageSize: number): void{
    if(this.isLoading) this.tableDigest.unsubscribe(); //cancel last pending request, to make new one
    const page: number = pageIndex + 1;
    this.isLoading = true;
    this.tableDigest = this.employeeService.getEmployees(search, sort, page, pageSize).subscribe( success => {
      this.isLoading = false;
      this.tableDigest.unsubscribe();
    });
  }
}



