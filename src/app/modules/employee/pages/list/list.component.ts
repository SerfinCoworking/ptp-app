import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '@shared/services/employee.service';
import { PaginationResult } from '@interfaces/pagination';
import { IEmployee } from '@interfaces/employee';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';
import { faEye, faPen, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { DialogStatusComponent } from '../../components/dialog-status/dialog-status.component';
import { NewsService } from '@shared/services/news.service';
import INews from '@interfaces/news';
import * as moment from 'moment';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {

  @Output() showEmployeeEvent = new EventEmitter();

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['enrollment', 'fullName', 'profile.dni', 'employer', 'phone', 'status', 'action'];
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

  faEye = faEye;
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faUserEdit = faUserEdit;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.updateTable(data.employees);
    });
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
    this.tableDigest = this.employeeService.getEmployees(search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<IEmployee>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  showEmployee(employee: IEmployee){
    this.showEmployeeEvent.emit(employee._id);
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
          this.message[employee._id] = 'Empleado eliminado';
        });
      }
    }));
  }
  
  openDialogStatus(employee: IEmployee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: employee, title: "Editar estado" };
    this.subscription.add(
    this.dialog.open(DialogStatusComponent, dialogConfig)
    .afterClosed()
    .subscribe((success)  => {
      if (success) {
        const news: INews = {
          dateFrom: moment().set('year', success.eventDate.year).set('month', (success.eventDate.month - 1)).set('date', success.eventDate.day).format("YYYY-MM-DD"),
          dateTo: moment().set('year', success.eventDate.year).set('month', (success.eventDate.month - 1)).set('date', success.eventDate.day).format("YYYY-MM-DD"),
          employee: employee,
          concept: {
            name: success.status.name,
            key: success.status.key
          },
          observation: success.observation
        } as INews;
        this.employeeService.updateStatus(employee._id, news).subscribe((res) => {
          this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
        });
      }
    }));
  }

  updateTable(paginatedEmployees: PaginationResult<IEmployee>){
    this.employees = new MatTableDataSource<any>(paginatedEmployees.docs);
    this.pageIndex = paginatedEmployees.page - 1;
    this.pageSize = paginatedEmployees.limit;
    this.length = paginatedEmployees.total;
  }
}



