import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@shared/services/user.service';
import { IUser } from '@interfaces/user';
import { PaginationResult } from '@interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<PaginationResult<IUser>> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<IUser>> |
    Promise<PaginationResult<IUser>> | PaginationResult<IUser> {
    return this.userService.getUsers();
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<IUser> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> |
    Promise<IUser> | IUser {
    const { id } = route.params;
    return id ? this.userService.getUser(id) : null;
  }
}
