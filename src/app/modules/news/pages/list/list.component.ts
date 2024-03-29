import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { NewsService } from '@shared/services/news.service';
import { PaginationResult } from '@shared/models/pagination';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';
import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import INews, { INewsConcept } from '@shared/models/news';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  @Output() showNewsEvent = new EventEmitter();

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['concept', 'dateFrom', 'dateTo', 'employee', 'createdAt', 'action'];
  news: MatTableDataSource<INews[]>;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex:number;
  pageSize:number;
  length:number;
  search: any;
  sort: string = 'createdAt_desc';
  isLoading: boolean = false;
  isDeleting: boolean[] = [false];
  isDeleted: boolean[] = [false];
  message: string[] = [''];
  concepts: INewsConcept[] = [];

  faEye = faEye
  faPen = faPen
  faTrashAlt = faTrashAlt

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.updateTable(data.news);
      this.concepts = data.concepts;
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

  applyFilters(event: Event): void{
    this.search = event;
    this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
  }

  getData(search: any, sort: string, pageIndex: number, pageSize: number): void{
    if(this.isLoading) this.tableDigest.unsubscribe(); //cancel last pending request, to make new one
    const page: number = pageIndex + 1;
    this.isLoading = true;
    this.tableDigest = this.newsService.getNews(search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<INews>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  showNews(news: INews){
    this.showNewsEvent.emit(news._id);
  }

  openDialog(news: INews) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Desea eliminar la novedad ${news.concept.name}?`, title: "Eliminar novedad" };
    this.subscription.add(
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.isDeleting[news._id] = true;
        this.newsService.deleteNews(news._id).subscribe(res => {
          this.isDeleted[news._id] = true;
          this.message[news._id] = 'Novedad eliminado';
        });
      }
    }));
  }

  updateTable(paginatednews: PaginationResult<INews>){
    this.news = new MatTableDataSource<any>(paginatednews.docs);
    this.pageIndex = paginatednews.page - 1;
    this.pageSize = paginatednews.limit;
    this.length = paginatednews.total;
  }
}