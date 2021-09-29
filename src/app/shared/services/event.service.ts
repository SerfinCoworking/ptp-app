import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';
import { IEvent } from '@shared/models/schedule';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  createOrUpdate(event: IEvent, periodId: string, employeeId: string){
    if(event._id){
      return this.http.patch<any>(`${environment.API_END_POINT}/period/${periodId}/${employeeId}/events/${event._id}`, event);
    }else{
      return this.http.post<any>(`${environment.API_END_POINT}/period/${periodId}/${employeeId}/events`, event)
    }
  }
  
  deleteEvent(event: IEvent, periodId: string, employeeId: string){
    return this.http.delete<any>(`${environment.API_END_POINT}/period/${periodId}/${employeeId}/events/${event._id}`);
  }
}
