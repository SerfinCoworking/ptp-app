import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Injectable } from '@angular/core';
import { ITemplate } from '@interfaces/template';
import { PaginationResult } from '@interfaces/pagination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  // LIST
  getTemplates(search?: string, sort?: string, page?: number, limit?: number): Observable<PaginationResult<ITemplate>>{
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

    return this.http.get<PaginationResult<ITemplate>>(`${environment.API_END_POINT}/templates`, {params: params});
  }

  getTemplate(id: string): Observable<ITemplate>{
    return this.http.get<ITemplate>(`${environment.API_END_POINT}/template/${id}`);
  }

}
