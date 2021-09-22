import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';
import { IPeriod } from '@shared/models/schedule';
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
}
