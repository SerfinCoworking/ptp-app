import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from '@permissions/services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class CanPermissionGuard implements CanActivate {

  constructor(private router: Router, private permissionService: PermissionService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const permissions: string[] = route.data["can"] as Array<string>;
      this.permissionService.hasPermission(permissions[0], permissions[1], permissions[2]).then(
        permit => {
          if (!permit) {
            this.router.navigate(['/dashboard/home'])
            return false
          }
        });
    return true;
  }

}
