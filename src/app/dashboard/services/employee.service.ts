import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any>{
    return this.http.get<any>(`${environment.API_END_POINT}/employees`);
  }
}
