import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';
import { PaginationResult } from '@shared/models/pagination';
import { ISchedule } from '@shared/models/schedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  list(search?: string, sort?: string, schedulePage?: number, pageSize?: number): Observable<PaginationResult<ISchedule>> {
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

    return this.http.get<PaginationResult<ISchedule>>(`${environment.API_END_POINT}/schedules`, {params: params});
  }
}
