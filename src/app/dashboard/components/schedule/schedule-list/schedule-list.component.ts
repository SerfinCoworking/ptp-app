import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ObjectiveService } from '@dashboard/services/objective.service';
import { PaginationResult } from '@interfaces/pagination';
import { IObjective } from '@interfaces/objective';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';
import { ICalendarList } from '@interfaces/schedule';
import { expandCalendar } from "@shared/animations/calendar.animations";
// fontawesome icons
import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.sass'],
  animations:[
    expandCalendar
  ]
})
export class ScheduleListComponent implements OnInit, OnDestroy {

  @Output() showObjectiveEvent = new EventEmitter();

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['name', 'address.street', 'address.city', 'action'];
  objectives: MatTableDataSource<IObjective[]>;
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
  calendarList: ICalendarList;
  _activeCalendar: number = -1;
  _activeCalendarEvent: number = -1;
  _showCalendar: boolean = false;
  faEye = faEye;
  faPen = faPen;
  faTrashAlt = faTrashAlt

  constructor(
    private activetedRoute: ActivatedRoute,
    private objectiveService: ObjectiveService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activetedRoute.data.subscribe( data => {
      this.calendarList = data.calendarList;
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
    this.tableDigest = this.objectiveService.getObjectives(search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<IObjective>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  showObjective(objective: IObjective){
    this.showObjectiveEvent.emit(objective._id);
  }

  openDialog(objective: IObjective) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar al objetivo ${objective.name}?`, title: "Eliminar objetivo" };
    this.subscription.add(
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.isDeleting[objective._id] = true;
        this.objectiveService.deleteObjective(objective._id).subscribe(res => {
          this.isDeleted[objective._id] = true;
          this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
        });
      }
    }));
  }

  updateTable(paginatedObjectives: PaginationResult<IObjective>){
    this.objectives = new MatTableDataSource<any>(paginatedObjectives.docs);
    this.pageIndex = paginatedObjectives.page - 1;
    this.pageSize = paginatedObjectives.limit;
    this.length = paginatedObjectives.total;
  }

  activeCalendar(target: number): void{
    this._activeCalendar = target;
    this._showCalendar = true;

  }

  triggerEventCollapse(target: number): void{
    if(this._showCalendar){
      this._activeCalendarEvent = this._activeCalendarEvent === target ? -1 : target;
    }
  }
}



