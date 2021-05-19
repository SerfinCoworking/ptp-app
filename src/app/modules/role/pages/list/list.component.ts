import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { PaginationResult } from '@interfaces/pagination';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';
import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import IRole from '@interfaces/role';
import { RoleService } from '@shared/services/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {  

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['name', 'nameDisplay', 'actions', 'action'];
  roles: MatTableDataSource<IRole[]>;
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.updateTable(data.roles);
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
    this.tableDigest = this.roleService.getRoles(search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<IRole>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }


  openDialog(role: IRole) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar al rol ${role.name}?`, title: "Eliminar rol" };
    this.subscription.add(
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.isDeleting[role._id] = true;
        this.roleService.deleteRole(role._id).subscribe(res => {
          this.isDeleted[role._id] = true;
          this.message[role._id] = 'Rol eliminado';
        });
      }
    }));
  }
  

  updateTable(paginatedRoles: PaginationResult<IRole>){
    this.roles = new MatTableDataSource<any>(paginatedRoles.docs);
    this.pageIndex = paginatedRoles.page - 1;
    this.pageSize = paginatedRoles.limit;
    this.length = paginatedRoles.total;
  }
}



