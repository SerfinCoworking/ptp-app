import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable } from 'rxjs';
import { IEmployee } from '@interfaces/employee';
import { PaginationResult } from '@interfaces/pagination';
import { mapTo, tap } from 'rxjs/operators';
import { ICalendarList } from '@interfaces/schedule';
import { IObjective } from '@interfaces/objective';


@Injectable({
  providedIn: 'root'
})

export class ScheduleService{

  constructor(private http: HttpClient) { }

  // LIST
  getSchedules(search?: string, sort?: string, page?: number, limit?: number): Observable<ICalendarList>{
    let params = new HttpParams();
    if(typeof page !== 'undefined'){
      params = params.append('page', page.toString());
    }
    if(typeof limit !== 'undefined'){
      params = params.append('limit', limit.toString());
    }
    if(typeof search !== 'undefined'){
      params = params.append('search', search);
    }
    if(typeof sort !== 'undefined'){
      params = params.append('sort', sort);
    }

    return this.http.get<ICalendarList>(`${environment.API_END_POINT}/schedules`);
  }

  // NEW RECORD
  newRecord():Observable<{objectives: IObjective[], employees: IEmployee[]}>{
    return this.http.get<{objectives: IObjective[], employees: IEmployee[]}>(`${environment.API_END_POINT}/schedules/new`);
  }

  // SHOW
  getEmployee(employeeId: string): Observable<IEmployee>{
    return this.http.get<IEmployee>(`${environment.API_END_POINT}/employees/${employeeId}`);
  }

  // CREATE
  addEmployee(employee: IEmployee): Observable<boolean>{
    return this.http.post<IEmployee>(`${environment.API_END_POINT}/employees`, employee).pipe(
      tap(() => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se agrego
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  // UPDATE
  updateEmployee(employee: IEmployee): Observable<boolean>{
    return this.http.patch<IEmployee>(`${environment.API_END_POINT}/employees/${employee._id}`, employee).pipe(
      tap((results: IEmployee) => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se actualizo
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  // DELETE
  deleteEmployee(employeeId: string): Observable<any>{
    return this.http.delete<any>(`${environment.API_END_POINT}/employees/${employeeId}`);
  }
}
