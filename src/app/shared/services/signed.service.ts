import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@root/environments/environment';
import { IEvent } from '@shared/models/schedule';

@Injectable({
  providedIn: 'root'
})
export class SignedService {

  constructor(private http: HttpClient) { }

  signInOutEmployee(params: {objectiveId: string, rfid: number}): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/signed`, params);
  }
  
  manualSignInOut(periodId: string, employeeId: string, event: IEvent): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/period/${periodId}/employee/${employeeId}/manual-sign`, {event});
  }
}
