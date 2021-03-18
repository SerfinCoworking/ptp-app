import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { AuthService } from '@auth/services/auth.service';
import { IUserRole, IUserRolePermission } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  constructor(private authService: AuthService) {
  }

  async hasPermission(resource: string, action?: string | null, attribute?: string): Promise<boolean>{  
    return this.hasRole([resource], false).then(
      hasRole => {
        if(hasRole){
          const roles: Array<IUserRole> = this.authService.getLoggedRoles();
          const role = roles.find((role: IUserRole) => role.name === resource);
          return role.permissions.some( (permission: IUserRolePermission) => permission.name === action);
        }else{
          return false;
        }
    });

  }
  
  async hasRole(roles: Array<string>, exclude: boolean): Promise<boolean>{
    const myRoles: Array<IUserRole> = this.authService.getLoggedRoles();

    if(exclude) return !roles.some( (role: string) => myRoles.find((myRole: IUserRole) => role === myRole.name));
    if(!exclude) return roles.some( (role: string) => myRoles.find((myRole: IUserRole) => role === myRole.name));
  }
}
