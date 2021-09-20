import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '@shared/services/employee.service';
import { IEmployee } from '@shared/models/employee';
import { PaginationResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class EmployeesResolverService implements Resolve<PaginationResult<IEmployee>> {

  constructor(private employeeService: EmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<IEmployee>> | Promise<PaginationResult<IEmployee>> | PaginationResult<IEmployee> {
    return this.employeeService.getEmployees();
  }
}
@Injectable({
  providedIn: 'root'
})
export class AllEmployeesResolverService implements Resolve<PaginationResult<IEmployee>> {

  constructor(private employeeService: EmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<IEmployee>> | Promise<PaginationResult<IEmployee>> | PaginationResult<IEmployee> {
    return this.employeeService.getAllEmployees();
  }
}

// Available employees [status != 'BAJA']
@Injectable({
  providedIn: 'root'
})
export class AvailableEmployeesResolverService implements Resolve<IEmployee[]> {

  constructor(private employeeService: EmployeeService) {}

  resolve(): Observable<IEmployee[]> | Promise<IEmployee[]> | IEmployee[] {
    return this.employeeService.getAvailableEmployees();
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolverService implements Resolve<IEmployee | null> {

  constructor(private employeeService: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee | null> | Promise<IEmployee | null> | IEmployee | null {
    const { id } = route.params;
    return id ? this.employeeService.getEmployee(id) : null;
  }
}
