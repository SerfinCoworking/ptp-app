import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';
import { PaginationResult } from '@shared/models/pagination';
import { IPeriod, ISchedule } from '@shared/models/schedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  list(search?: string, sort?: string, schedulePage?: number, limit?: number): Observable<PaginationResult<ISchedule>> {
    let params = new HttpParams();
    if (typeof schedulePage !== 'undefined') {
      params = params.append('page', schedulePage.toString());
    }
    if (typeof search !== 'undefined') {
      params = params.append('search', search);
    }
    if (typeof sort !== 'undefined') {
      params = params.append('sort', sort);
    }
    if (typeof limit !== 'undefined') {
      params = params.append('limit', limit.toString());
    }

    return this.http.get<PaginationResult<ISchedule>>(`${environment.API_END_POINT}/schedules`, {params: params});
  }

  schedule(id: string): Observable<ISchedule>{
    return this.http.get<ISchedule>(`${environment.API_END_POINT}/schedules/${id}`);
  }

  createOrUpdate(period: IPeriod, id?: string){
    if(id){
      return this.http.patch<IPeriod>(`${environment.API_END_POINT}/schedules/${id}`, period);
    }else{
      return this.http.post<IPeriod>(`${environment.API_END_POINT}/schedules`, period);
    }
  }

  getPeriodToPrint(periodId: string): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/period/${periodId}/print`);
  }
}
