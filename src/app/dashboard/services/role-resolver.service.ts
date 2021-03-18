import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginationResult } from '@interfaces/pagination';
import { RoleService } from './role.service';
import IRole from '@interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RolesResolverService implements Resolve<PaginationResult<IRole>> {

  constructor(private roleService: RoleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<IRole>> |
    Promise<PaginationResult<IRole>> | PaginationResult<IRole> {
    return this.roleService.getRoles();
  }
}


@Injectable({
  providedIn: 'root'
})
export class RoleResolverService implements Resolve<IRole | null> {

  constructor(private roleService: RoleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRole | null> | Promise<IRole | null> | IRole | null {
    const { id } = route.params;
    return id ? this.roleService.getRole(id) : null;
  }
}
