import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PaginationResult } from '@shared/models/pagination';
import { IPeriod } from '@shared/models/schedule';
import { PeriodService } from '@shared/services/period.service';
import { Subscription } from 'rxjs';
import { faEye, faPen, faCalendarAlt, faPrint, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['monthName', 'fromDate', 'toDate', 'action'];
  objective: {_id: string, name: string};
  periods: MatTableDataSource<IPeriod[]>;
  showList: boolean = true;
  search: string = '';
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  length: number;
  sort: string;
  isDeleting: boolean[] = [false];
  isLoading: boolean = false;
  faEye = faEye;
  faPen = faPen;
  faPrint = faPrint;
  faCalendarAlt = faCalendarAlt;
  faTrashAlt = faTrashAlt;
  

  constructor(private periodService: PeriodService, 
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.showList = !!data.periods.docs.length;
      this.updateTable(data.periods);
      this.objective = data.objective;
    });
  }

  getData(search: string, sort: string, pageIndex: number, pageSize: number): void{
    if(this.isLoading) this.tableDigest.unsubscribe(); //cancel last pending request, to make new one
    const page: number = pageIndex + 1;
    this.isLoading = true;
    this.tableDigest = this.periodService.getPeriods(this.objective._id, search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<IPeriod>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  getSort(event?: Sort): void{
    this.sort = event.active + "_" + event.direction;
    this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
  }

  getPaginationData(event?:PageEvent): PageEvent{
    this.getData(this.search, this.sort, event.pageIndex, event.pageSize);
    return event;
  }

  updateTable(paginatedSchedules: PaginationResult<IPeriod>){
    this.periods = new MatTableDataSource<any>(paginatedSchedules.docs);
    this.pageIndex = paginatedSchedules.page - 1;
    this.pageSize = paginatedSchedules.limit;
    this.length = paginatedSchedules.total;
  }

  openDialog(period: IPeriod) {
    const periodName: string = moment(period.toDate, 'YYYY-MM-DD').format('MMMM YYYY');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar el período ${periodName}?`, title: "Eliminar período" };
    
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.isDeleting[period._id] = true;
        this.periodService.delete(period._id).subscribe(res => {
          this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
        });
      }
    })
  }
}
