
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { TemplateService } from '@shared/services/template.service';
import { PaginationResult } from '@interfaces/pagination';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';
import { faEye, faPen, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ITemplate } from '@interfaces/template';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription();
    private tableDigest: Subscription = new Subscription();
    displayedColumns: string[] = ['name', 'schedule', 'action'];
    templates: MatTableDataSource<ITemplate[]>;
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
      private templateService: TemplateService,
      private dialog: MatDialog) {}


  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.updateTable(data.templates);
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
    this.tableDigest = this.templateService.getTemplates(search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<ITemplate>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  openDialog(template: ITemplate) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar al template ${template.name}?`, title: "Eliminar template" };
    this.subscription.add(
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.isDeleting[template._id] = true;
        this.templateService.deleteTemplate(template._id).subscribe(res => {
          this.isDeleted[template._id] = true;
          this.message[template._id] = 'Template eliminado';
        });
      }
    }));
  }
  

  updateTable(paginatedTemplates: PaginationResult<ITemplate>){
    this.templates = new MatTableDataSource<any>(paginatedTemplates.docs);
    this.pageIndex = paginatedTemplates.page - 1;
    this.pageSize = paginatedTemplates.limit;
    this.length = paginatedTemplates.total;
  }
}
