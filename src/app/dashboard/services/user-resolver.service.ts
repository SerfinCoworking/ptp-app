import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@dashboard/services/user.service';
import { IUser } from '@interfaces/user';
import { PaginationResult } from '@interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<PaginationResult<IUser>> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<IUser>> |
    Promise<PaginationResult<IUser>> | PaginationResult<IUser> {
    return this.userService.getUsers();
  }
}
