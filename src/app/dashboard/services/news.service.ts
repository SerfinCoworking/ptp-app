import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { PaginationResult } from '@interfaces/pagination';
import INews, { INewsConcept } from '@interfaces/news';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  // LIST
  getNews(search?: string, sort?: string, page?: number, limit?: number): Observable<PaginationResult<INews>>{
    let params = new HttpParams();
    if(typeof page !== 'undefined'){
      params = params.append('page', page.toString());
    }
    if(typeof limit !== 'undefined'){
      params = params.append('limit', limit.toString());
    }
    if(typeof search !== 'undefined'){
      params = params.append('search', search);
    }
    if(typeof sort !== 'undefined'){
      params = params.append('sort', sort);
    }

    return this.http.get<PaginationResult<INews>>(`${environment.API_END_POINT}/news`, {params: params});
  }

  getNewsByDate(dateFrom: string, dateTo: string): Observable<INews[]>{
    let params = new HttpParams();
    params = params.append('dateFrom', dateFrom);
    params = params.append('dateTo', dateTo);
    return this.http.get<INews[]>(`${environment.API_END_POINT}/news-by-date`, {params: params});
  }

  getNew(id: string): Observable<INews>{
    return this.http.get<INews>(`${environment.API_END_POINT}/news/${id}`);
  }
  
  getNewsConcept(): Observable<INewsConcept[]>{
    return this.http.get<INewsConcept[]>(`${environment.API_END_POINT}/news-concept`);
  }
  
  createOrUpdate(news: INews, id?: string){
    if(id){
      return this.http.patch<INewsConcept>(`${environment.API_END_POINT}/news/${id}`, news);
    }else{
      return this.http.post<INewsConcept>(`${environment.API_END_POINT}/news`, news);
    }
  }

  // DELETE
  deleteNews(newsId: string): Observable<any>{
    return this.http.delete<any>(`${environment.API_END_POINT}/news/${newsId}`);
  }
}