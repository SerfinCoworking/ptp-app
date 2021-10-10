import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';
import { PaginationResult } from '@shared/models/pagination';
import { IPeriod, IShift } from '@shared/models/schedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }

  getPeriods(objectiveId: string, filters?: any, sort?: string, page?: number, limit?: number): Observable<PaginationResult<IPeriod>>{
    let params = new HttpParams();
    if(typeof page !== 'undefined'){
      params = params.append('page', page.toString());
    }
    if(typeof limit !== 'undefined'){
      params = params.append('limit', limit.toString());
    }
    if(typeof filters !== 'undefined'){
      params = params.append('search', filters.objective)
      params = params.append('dateFrom', filters.dateFrom);
      params = params.append('dateTo', filters.dateTo);
    }
    if(typeof sort !== 'undefined'){
      params = params.append('sort', sort);
    }

    return this.http.get<PaginationResult<IPeriod>>(`${environment.API_END_POINT}/periods/objective/${objectiveId}`, {params: params});
  }

  period(id: string): Observable<IPeriod>{
    return this.http.get<IPeriod>(`${environment.API_END_POINT}/period/${id}/show`);
  }
  
  periodPlanning(id: string): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/period/${id}/planning`);
  }
  
  periodMonitoring(id: string): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/period/${id}/monitor`);
  }
  
  getEmployeesForPlanning(periodId: string, fromDate: string, toDate: string, employee: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('periodId', periodId);
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    params = params.append('employee', employee);

    return this.http.get<any>(`${environment.API_END_POINT}/period/employees-for-planning`, {params});
  }
  
  addEmployee(id: string, shift: IShift){
    return this.http.post<any>(`${environment.API_END_POINT}/period/${id}/planning`, {shift: shift});
  }
  
  deleteEmployee(id: string, employeeId: string){
    return this.http.delete<any>(`${environment.API_END_POINT}/period/${id}/planning/${employeeId}`);
  }
}
