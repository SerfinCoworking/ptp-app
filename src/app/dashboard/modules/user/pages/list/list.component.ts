import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '@shared/services/user.service';
import { PaginationResult } from '@interfaces/pagination';
import { IUser } from '@interfaces/user';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';
import { faEye, faPen, faTrashAlt, faUserLock } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {

  @Output() showUserEvent = new EventEmitter();

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['fullName', 'profile.dni', 'email', 'action'];
  users: MatTableDataSource<IUser[]>;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: number;
  length: number;
  search: string;
  sort: string;
  isLoading = false;
  isDeleting: boolean[] = [false];
  isDeleted: boolean[] = [false];
  message: string[] = [''];
  faEye = faEye;
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faUserLock = faUserLock;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.updateTable(data.users);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPaginationData(event?: PageEvent): PageEvent {
    this.getData(this.search, this.sort, event.pageIndex, event.pageSize);
    return event;
  }

  getSort(event?: Sort): void {
    this.sort = event.active + ' ' + event.direction;
    this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 3 || filterValue.length === 0) {
      this.search = filterValue;
      this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
    }
  }

  getData(search: string, sort: string, pageIndex: number, pageSize: number): void {
    if (this.isLoading) { this.tableDigest.unsubscribe(); } // cancel last pending request, to make new one
    const page: number = pageIndex + 1;
    this.isLoading = true;
    this.tableDigest = this.userService
      .getUsers(search, sort, page, pageSize)
      .subscribe( (paginateResult: PaginationResult<IUser>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  showUser(user: IUser) {
    this.showUserEvent.emit(user._id);
  }

  openDialog(user: IUser) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar al usuario ${user.profile.firstName} ${user.profile.lastName}?`,
      title: 'Eliminar usuario' };
    this.subscription.add(
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.isDeleting[user._id] = true;
        this.userService.deleteUser(user._id).subscribe(res => {
          this.isDeleted[user._id] = true;
          this.message[user._id] = 'Usuario eliminado.';
        });
      }
    }));
  }

  updateTable(paginatedUsers: PaginationResult<IUser>) {
    this.users = new MatTableDataSource<any>(paginatedUsers.docs);
    this.pageIndex = paginatedUsers.page - 1;
    this.pageSize = paginatedUsers.limit;
    this.length = paginatedUsers.total;
  }
}



