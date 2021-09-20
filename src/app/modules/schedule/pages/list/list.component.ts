import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PaginationResult } from '@shared/models/pagination';
import { ISchedule } from '@shared/models/schedule';
import { ScheduleService } from '@shared/services/schedule.service';
import { Subscription } from 'rxjs';
import { faPlus, faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['objective.name', 'lastPeriodMonth', 'lastPeriodRange', 'action'];
  isLoading: boolean = false;
  datasource: null;
  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  length:number;
  search: string;
  sort: string;
  schedules: MatTableDataSource<ISchedule[]>;
  isDeleting: boolean[] = [false];
  isDeleted: boolean[] = [false];

  faPlus = faPlus;

  constructor(private activetedRoute: ActivatedRoute, private scheduleService: ScheduleService ) { }

  ngOnInit(): void {

    this.activetedRoute.data.subscribe( data => {
      console.log(data);
      this.updateTable(data.schedules);
      // this.updateTable(data.objectives);
    });
  }

  getSort(event?: Sort): void{
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
    this.tableDigest = this.scheduleService.list(search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<ISchedule>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  getPaginationData(event?:PageEvent): PageEvent{
    this.getData(this.search, this.sort, event.pageIndex, event.pageSize);
    return event;
  }

  updateTable(paginatedSchedules: PaginationResult<ISchedule>){
    this.schedules = new MatTableDataSource<any>(paginatedSchedules.docs);
    this.pageIndex = paginatedSchedules.page - 1;
    this.pageSize = paginatedSchedules.limit;
    this.length = paginatedSchedules.total;
  }

  // openDialog(schedule: ISchedule) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.data = { item: `Desea eliminar al objetivo ${schedule.objective.name}?`, title: "Eliminar agenda" };
  //   this.subscription.add(
  //   this.dialog.open(ConfirmComponent, dialogConfig)
  //   .afterClosed()
  //   .subscribe((success: boolean)  => {
  //     if (success) {
  //       this.isDeleting[objective._id] = true;
  //       this.objectiveService.deleteObjective(objective._id).subscribe(res => {
  //         this.isDeleted[objective._id] = true;
  //         this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
  //       });
  //     }
  //   }));
  // }
  
}
