import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { IEmployee } from '@interfaces/employee';
import { PaginationResult } from '@interfaces/pagination';
import { mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private subscription: Subscription = new Subscription();
  private _employeesList: BehaviorSubject<PaginationResult<IEmployee>> = new BehaviorSubject<PaginationResult<IEmployee>>( {} as PaginationResult<IEmployee>);
  private _isVisibleEmployee: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _employee: BehaviorSubject<IEmployee> = new BehaviorSubject<IEmployee>({} as IEmployee);

  constructor(private http: HttpClient) { }

  // LIST
  getEmployees(search?: string, sort?: string, page?: number, limit?: number): Observable<boolean>{
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

    return this.http.get<PaginationResult<IEmployee>>(`${environment.API_END_POINT}/employees`, {params: params}).pipe(
      tap((results: PaginationResult<IEmployee>) => this.setEmployeesList(results)),
      mapTo(true)
    );
  }

  // SHOW
  getEmployee(employeeId: string): Observable<boolean>{
    const params = {id: employeeId};
    return this.http.get<IEmployee>(`${environment.API_END_POINT}/employees/${employeeId}`).pipe(
      tap((results: IEmployee) => this.showEmployee(results)),
      mapTo(true)
    );
  }

  // CREATE
  addEmployee(employee: IEmployee): Observable<boolean>{
    return this.http.post<IEmployee>(`${environment.API_END_POINT}/employees`, employee).pipe(
      tap(() => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se agrego
        // correctamente un empleado
        // actualizamos el listado de empleados
        this.subscription.add(
        this.getEmployees().subscribe(success => {
          console.log("se ha agregado un nuevo empleado");
          this.subscription.unsubscribe(); // removemos la subscripcion al listado
        }));
      }),
      mapTo(true)
    );
  }

  // UPDATE
  updateEmployee(employee: IEmployee): Observable<boolean>{
    return this.http.patch<IEmployee>(`${environment.API_END_POINT}/employees/${employee._id}`, employee).pipe(
      tap(() => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se actualizo
        // correctamente un empleado
        // actualizamos el listado de empleados
        this.subscription.add(
        this.getEmployees().subscribe(success => {
          console.log("se ha agregado un nuevo empleado")
          this.subscription.unsubscribe(); // removemo la subscripcion al listado
        }));
      }),
      mapTo(true)
    );
  }

  // DELETE
  deleteEmployee(employeeId: string): Observable<any>{
    return this.http.delete<any>(`${environment.API_END_POINT}/employees/${employeeId}`);
  }

  setEmployeesList(results: PaginationResult<IEmployee>){
    this._employeesList.next(results);
  }

  private showEmployee(employee: IEmployee){
    this._employee.next(employee);
    this._isVisibleEmployee.next(true);
  }

  hideEmployee(){
    this._employee.next({} as IEmployee);
    this._isVisibleEmployee.next(false);
  }

  get employee(): Observable<IEmployee>{
    return this._employee.asObservable();
  }

  get employees(): Observable<PaginationResult<IEmployee>>{
    return this._employeesList.asObservable();
  }

  get isVisibleEmployee(): Observable<boolean>{
    return this._isVisibleEmployee.asObservable();
  }

}
