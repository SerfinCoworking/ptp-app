import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '@dashboard/services/employee.service';
import { PaginationResult } from '@interfaces/pagination';
import { IEmployee } from '@interfaces/employee';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['fullName', 'profile.dni', 'email', 'phone', 'action'];
  employees: MatTableDataSource<IEmployee[]>;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex:number;
  pageSize:number;
  length:number;
  search: string;
  sort: string;
  isLoading: boolean = false;
  isDeleting: boolean[] = [false];
  isDeleted: boolean[] = [false];
  message: string[] = [''];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.subscription.add(this.employeeService.employees.subscribe(
      (paginatedEmployees: PaginationResult<IEmployee>) => {
        this.employees = new MatTableDataSource<any>(paginatedEmployees.docs);

        this.pageIndex = paginatedEmployees.page - 1;
        this.pageSize = paginatedEmployees.limit;
        this.length = paginatedEmployees.total;
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

  showEmployee(employee: IEmployee){
    this.subscription.add(
      this.employeeService.getEmployee(employee._id).subscribe(
        success => console.log("get employee")
      )
    );
  }

  openDialog(employee: IEmployee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar al empleado ${employee.profile.firstName} ${employee.profile.lastName}?`, title: "Eliminar empleado" };
    this.subscription.add(
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.isDeleting[employee._id] = true;
        this.employeeService.deleteEmployee(employee._id).subscribe(res => {
          this.isDeleted[employee._id] = true;
          this.message[employee._id] = "Emepleado eliminado.";
        });
      }
    }));
  }
}



