import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { NewsService } from '@dashboard/services/news.service';
import { PaginationResult } from '@interfaces/pagination';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';
import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import INews from '@interfaces/news';
import moment from 'moment';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent implements OnInit {

  @Output() showNewsEvent = new EventEmitter();

  private subscription: Subscription = new Subscription();
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['concept', 'dateFrom', 'dateTo', 'employee', 'action'];
  news: MatTableDataSource<INews[]>;
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