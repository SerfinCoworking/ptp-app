import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';
import { IPeriod, IShift } from '@shared/models/schedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }

  period(id: string): Observable<IPeriod>{
    return this.http.get<IPeriod>(`${environment.API_END_POINT}/period/${id}/show`);
  }
  
  periodPlanning(id: string): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/period/${id}/planning`);
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
