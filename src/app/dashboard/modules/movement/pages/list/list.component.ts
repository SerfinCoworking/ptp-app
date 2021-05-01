import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IMovement from '@interfaces/movement';
import {MatTableDataSource} from '@angular/material/table';
import { PaginationResult } from '@interfaces/pagination';
import { Sort } from '@angular/material/sort';
import { MovementService } from '@shared/services/movement.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  movements: MatTableDataSource<IMovement[]>;
  private tableDigest: Subscription = new Subscription();
  displayedColumns: string[] = ['user', 'action', 'resource', 'target', 'date'];
  pageIndex:number;
  pageSize:number;
  length:number;
  sort: string;
  search: string;
  isLoading: boolean = false;
  pageEvent: PageEvent;


  constructor(private activatedRoute: ActivatedRoute, private movementService: MovementService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.updateTable(data.movements);
    });
  }

  updateTable(paginatednews: PaginationResult<IMovement>){
    this.movements = new MatTableDataSource<any>(paginatednews.docs);
    this.pageIndex = paginatednews.page - 1;
    this.pageSize = paginatednews.limit;
    this.length = paginatednews.total;
  }

  getSort(event?:Sort): void{
    this.sort = event.active + "_" + event.direction;
    this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
  }

  getData(search: string, sort: string, pageIndex: number, pageSize: number): void{
    if(this.isLoading) this.tableDigest.unsubscribe(); //cancel last pending request, to make new one
    const page: number = pageIndex + 1;
    this.isLoading = true;
    this.tableDigest = this.movementService.getMovements(search, sort, page, pageSize).subscribe( (paginateResult: PaginationResult<IMovement>) => {
      this.isLoading = false;
      this.updateTable(paginateResult);
      this.tableDigest.unsubscribe();
    });
  }

  getPaginationData(event?:PageEvent): PageEvent{
    this.getData(this.search, this.sort, event.pageIndex, event.pageSize);
    return event;
  }
}
