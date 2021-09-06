import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { PaginationResult } from '@shared/models/pagination';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ILiquidation from '@shared/models/liquidation';
import { LiquidationService } from '@shared/services/liquidation.service';
import moment from 'moment';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {  

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['name','period', 'action'];
  liquidations: MatTableDataSource<ILiquidation>;
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
    private liquidationService: LiquidationService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.updateTable(data.liquidations);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getPaginationData(event?:PageEvent): PageEvent{
    this.getData(this.search, this.sort, event.pageIndex, event.pageSize);
    return event;
  }

  getSort(event?): void{
    this.sort = event.active + "_" + event.direction;
    this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
  }

  applyFilters(event: any): void{
    this.search = event;
    this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
  }

  getData(search: string, sort: string, pageIndex: number, pageSize: number): void{
    if(this.isLoading) this.tableDigest.unsubscribe(); //cancel last pending request, to make new one
    const page: number = pageIndex + 1;
    this.isLoading = true;
    this.tableDigest = this.liquidationService.list(search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<ILiquidation>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  openDialog(liquidation: ILiquidation) {
    moment.locale('es');
    const dialogConfig = new MatDialogConfig();
    const month = moment(liquidation.dateTo, "YYYY-MM-DD");
    dialogConfig.data = { item: `Desea eliminar la liquidación de ${month.format("MMMM")} ${month.format("YYYY")}?`, title: "Eliminar liquidación" };
    
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.liquidationService.destroy(liquidation._id).subscribe(res => {
          this.liquidationService.list().subscribe(liquidations => {
            this.updateTable(liquidations);
          });
        });
      }
    });
  }
  

  updateTable(paginatedLiq: PaginationResult<ILiquidation>){
    this.liquidations = new MatTableDataSource<any>(paginatedLiq.docs);
    this.pageIndex = paginatedLiq.page - 1;
    this.pageSize = paginatedLiq.limit;
    this.length = paginatedLiq.total;
  }
}