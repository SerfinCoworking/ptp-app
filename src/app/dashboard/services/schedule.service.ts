import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable } from 'rxjs';
import { IEmployee } from '@interfaces/employee';
import { PaginationResult } from '@interfaces/pagination';
import { mapTo, tap } from 'rxjs/operators';
import { ICalendarList, IPeriod } from '@interfaces/schedule';
import { IObjective } from '@interfaces/objective';


@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  constructor(private http: HttpClient) { }

  // LIST
  getSchedules(search?: string, sort?: string, page?: number, limit?: number): Observable<ICalendarList> {
    let params = new HttpParams();
    if (typeof page !== 'undefined') {
      params = params.append('page', page.toString());
    }
    if (typeof limit !== 'undefined') {
      params = params.append('limit', limit.toString());
    }
    if (typeof search !== 'undefined') {
      params = params.append('search', search);
    }
    if (typeof sort !== 'undefined') {
      params = params.append('sort', sort);
    }

    return this.http.get<ICalendarList>(`${environment.API_END_POINT}/schedules`);
  }

  // NEW RECORD
  newRecord(): Observable<{objectives: IObjective[], employees: IEmployee[]}> {
    return this.http.get<{objectives: IObjective[], employees: IEmployee[]}>(`${environment.API_END_POINT}/schedules/new`);
  }

  // CREATE EMPTY SCHEDULE
  create(objective: IObjective): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/schedules`, { objective });
  }

  // CREATE EMPTY PERIOD
  createPeriod(objective: IObjective, fromDate: string, toDate: string): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/schedules/create-period`, { objective, fromDate, toDate });
  }

  //  CREATE SHIFTS
  createShift(periodId: string, employees: IEmployee[]): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/schedules/add-shifts`, { periodId, employees });
  }

  // GET PERIOD BY ID
  getPeriod(periodId: string): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/schedules/period/${periodId}`);
  }

  // SAVE PERIOD
  savePeriod(period: IPeriod): Observable<IPeriod>{
    return this.http.patch<IPeriod>(`${environment.API_END_POINT}/schedules/period/${period._id}`, period);
  }

  // DELETE
  // deleteEmployee(employeeId: string): Observable<any>{
  //   return this.http.delete<any>(`${environment.API_END_POINT}/employees/${employeeId}`);
  // }
}
