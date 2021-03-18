import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { PermissionService } from '@permissions/services/permission.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotObjectiveRoleGuard implements CanActivate {

  constructor(private router: Router, private PermissionService: PermissionService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.PermissionService.hasRole(['objective'], true).then(
      permit => {
        // not permit
        if (!permit) {
          this.router.navigate(['/objetivo/home']);
          return false;
        }
      });
    return true;
  }
}
