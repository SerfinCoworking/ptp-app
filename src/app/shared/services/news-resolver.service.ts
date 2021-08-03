import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService } from '@shared/services/news.service';
import { PaginationResult } from '@shared/models/pagination';
import INews, { INewsConcept } from '@shared/models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsResolverService implements Resolve<PaginationResult<INews>> {

  constructor(private newsService: NewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<INews>> | Promise<PaginationResult<INews>> | PaginationResult<INews> {
    return this.newsService.getNews();
  }
}
@Injectable({
  providedIn: 'root'
})
export class NewsConceptResolverService implements Resolve<INewsConcept[]> {

  constructor(private newsService: NewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INewsConcept[]> | Promise<INewsConcept[]> | INewsConcept[] {
    return this.newsService.getNewsConcept();
  }
}
