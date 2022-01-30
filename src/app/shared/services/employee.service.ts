import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable } from 'rxjs';
import { IEmployee } from '@shared/models/employee';
import { PaginationResult } from '@shared/models/pagination';
import { mapTo, tap } from 'rxjs/operators';
import INews from '@shared/models/news';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService{

  constructor(private http: HttpClient) { }

  // LIST
  getEmployees(search?: string, sort?: string, page?: number, limit: number = 10): Observable<PaginationResult<IEmployee>>{
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

    return this.http.get<PaginationResult<IEmployee>>(`${environment.API_END_POINT}/employees`, {params: params});
  }
  
  getEmployeesByRfid(rfid: number, _id: string): Observable<IEmployee[]>{
    let params = new HttpParams();
    if(typeof _id !== 'undefined'){
      params = params.append('id', _id);
    }
    return this.http.get<IEmployee[]>(`${environment.API_END_POINT}/employees-by-rfid/${rfid}`, {params: params});
  }
  // All LIST
  getAllEmployees(): Observable<PaginationResult<IEmployee>>{
    return this.http.get<PaginationResult<IEmployee>>(`${environment.API_END_POINT}/employees`);
  }

  // All LIST
  getAvailableEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(`${environment.API_END_POINT}/employees/available`);
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

  // UPDATE Employee Status
  updateStatus(employeeId: string, news: INews): Observable<boolean>{
    return this.http.patch<IEmployee>(`${environment.API_END_POINT}/employees/${employeeId}/status`, news).pipe(
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
