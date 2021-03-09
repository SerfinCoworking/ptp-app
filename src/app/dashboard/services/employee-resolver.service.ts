import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '@dashboard/services/employee.service';
import { IEmployee } from '@interfaces/employee';
import { PaginationResult } from '@interfaces/pagination';

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
export class EmployeeResolverService implements Resolve<IEmployee> {

  constructor(private employeeService: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee> | Promise<IEmployee> | IEmployee {
    const { id } = route.params;
    return this.employeeService.getEmployee(id);
  }
}
