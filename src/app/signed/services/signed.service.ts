import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@root/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignedService {

  constructor(private http: HttpClient) { }

  signInOutEmployee(params: {objectiveId: string, rfid: number}): Observable<any>{
    return this.http.post<any>(`${environment.API_END_POINT}/schedules/period`, params);
  }
}
