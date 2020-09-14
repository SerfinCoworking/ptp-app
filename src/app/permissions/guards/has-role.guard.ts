import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { RolesService } from '@permissions/services/roles.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private router: Router, private rolesService: RolesService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const permissions: string[] = route.data["role"] as Array<string>;
      this.rolesService.hasRole(permissions[0], permissions[1]  === 'exclude').then(
        permit => {
          if (!permit) {
            this.router.navigate(['/objetivo/home'])
            return false
          }
        });
    return true;  }

}
