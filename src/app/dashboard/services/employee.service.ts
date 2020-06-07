import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { IEmployee } from '@interfaces/employee';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private subscription: Subscription = new Subscription();
  private _employees: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([]);

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<boolean>{
    return this.http.get<IEmployee[]>(`${environment.API_END_POINT}/employees`).pipe(
      tap((employees: IEmployee[]) => this.setEmployees(employees)),
      mapTo(true)
    );
  }

  addEmployee(employee: IEmployee): Observable<boolean>{
    return this.http.post<IEmployee>(`${environment.API_END_POINT}/employees`, employee).pipe(
      tap(employee => this.pushEmployee(employee)),
      mapTo(true)
    );
  }

  private pushEmployee(employee: IEmployee){
    this._employees.next([...this.getEmployeesAsArray(), ...[employee]]);
  }

  private getEmployeesAsArray(): IEmployee[]{
    let employees: IEmployee[];
    this.subscription.add(this.employees.subscribe( employeesResult => employees = employeesResult));
    this.subscription.unsubscribe();
    return employees;
  }

  setEmployees(employees: IEmployee[]){
    this._employees.next(employees);
  }

  get employees(): Observable<IEmployee[]>{
    return this._employees.asObservable();
  }
}
