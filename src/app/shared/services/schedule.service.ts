import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { IEmployee } from '@interfaces/employee';
import { ICalendarList, IPeriod } from '@interfaces/schedule';
import { IObjective } from '@interfaces/objective';
import { PaginationResult } from '@interfaces/pagination';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  private _calendarEvents: BehaviorSubject<{period: PaginationResult<IPeriod>, days: Array<string>}>;
  
  constructor(private http: HttpClient) { 
    const period: PaginationResult<IPeriod> = {} as PaginationResult<IPeriod>;
    const days: Array<string> = [];
    this._calendarEvents = new BehaviorSubject<{period: PaginationResult<IPeriod>, days: Array<string>}>({period, days});
  }

  // LIST
  getSchedules(search?: string, sort?: string, schedulePage?: number, periodPage?: number, objectiveId?: string): Observable<ICalendarList> {
    let params = new HttpParams();
    if (typeof schedulePage !== 'undefined') {
      params = params.append('schedulePage', schedulePage.toString());
    }
    if (typeof periodPage !== 'undefined' && typeof objectiveId !== 'undefined') {
      params = params.append('periodPage', periodPage.toString());
      params = params.append('objectiveId', objectiveId.toString());
    }
    if (typeof search !== 'undefined') {
      params = params.append('search', search);
    }
    if (typeof sort !== 'undefined') {
      params = params.append('sort', sort);
    }

    return this.http.get<ICalendarList>(`${environment.API_END_POINT}/schedules`, {params: params});
  }
  
  // LIST
  getSchedulePeriods(scheduleId: string, periodPage?: number, stream: boolean = false): Observable<ICalendarList> {
    let params = new HttpParams();
    
    if (typeof periodPage !== 'undefined') {
      params = params.append('periodPage', periodPage.toString());
    }
    
    return this.http.get<ICalendarList>(`${environment.API_END_POINT}/schedule-by-id/${scheduleId}`, {params: params, headers: {'Silent': (stream ? 'yes' : 'no') } });
  }

  // NEW RECORD
  newRecord(): Observable<IObjective[]> {
    return this.http.get<IObjective[]>(`${environment.API_END_POINT}/schedules/new`);
  }

  // CREATE EMPTY SCHEDULE
  create(objective: string): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/schedules`, { objective });
  }
  
  // GET SCHEDULE
  getSchedule(id: string): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/schedules/${id}`);
  }

  // GET PERIOD BY ID
  getPeriod(periodId: string): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/period/${periodId}`);
  }

  // CREATE EMPTY PERIOD
  createPeriod(objective: IObjective, fromDate: string, toDate: string): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/period`, { objective, fromDate, toDate });
  }
  
  // UPDATE PERIOD
  updatePeriod(periodId: string, fromDate: string, toDate: string): Observable<any>{
    return this.http.patch<any>(`${environment.API_END_POINT}/period/${periodId}`, { fromDate, toDate });
  }

  //  CREATE SHIFTS
  createShifts(periodId: string, employees: IEmployee[]): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/period/${periodId}/create-shifts`, { employees });
  }  

  // SAVE PERIOD
  updateShifts(period: IPeriod): Observable<IPeriod>{
    return this.http.patch<IPeriod>(`${environment.API_END_POINT}/period/${period._id}/update-shifts`, period);
  }

  // DELETE PERIOD
  deletePeriod(periodId: string): Observable<any>{
    return this.http.delete<any>(`${environment.API_END_POINT}/period/${periodId}`);
  }
  
  // UPDATE CHECKIN / CHECKOUT
  saveSigneds(data){
    return this.http.patch<any>(`${environment.API_END_POINT}/period/${data.periodId}/update-signeds`, data);
  }
  
  getPeriodToPrint(periodId: string): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/period/${periodId}/print`);
  }
  
  setCalendarEvents(period: PaginationResult<IPeriod>, days: Array<string>): void{
    this._calendarEvents.next({period, days});
  }
  get calendarEvents(): Observable<{period: PaginationResult<IPeriod>,  days: Array<string>}>{
    return this._calendarEvents.asObservable();
  }
}
