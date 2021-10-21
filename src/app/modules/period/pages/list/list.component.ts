import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PaginationResult } from '@shared/models/pagination';
import { IPeriod } from '@shared/models/schedule';
import { PeriodService } from '@shared/services/period.service';
import { Subscription } from 'rxjs';
import { faEye, faPen, faCalendarAlt, faPrint } from '@fortawesome/free-solid-svg-icons';

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
  search: string = '';
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  length: number;
  sort: string;
  isLoading: boolean = false;
  faEye = faEye;
  faPen = faPen;
  faPrint = faPrint;
  faCalendarAlt = faCalendarAlt;
  

  constructor(private periodService: PeriodService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.updateTable(data.periods);
      this.objective = data.periods.docs[0].objective;
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

}
