import { Injectable } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { IUserRole, IUserRolePermission } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class PermissionService {

  constructor(private authService: AuthService) {
  }

  async hasPermission(resource: string, action?: string | null, attribute?: string): Promise<boolean>{  
    return this.hasRole([resource], false).then(
      hasRole => {
        if(hasRole){
          const roles: Array<IUserRole> | IUserRole = this.authService.getLoggedRoles();
          let role: IUserRole;
          if(Array.isArray(roles)){
            role = roles.find((role: IUserRole) => role.name === resource);
        }else{
            role = roles.name === resource ? roles : {} as IUserRole;
          }
          return role.permissions.some( (permission: IUserRolePermission) => permission.name === action);
        }else{
          return false;
        }
    });

  }
  
  async hasRole(roles: Array<string>, exclude: boolean): Promise<boolean>{
    const myRoles: Array<IUserRole> | IUserRole = this.authService.getLoggedRoles();
    if(Array.isArray(myRoles)){
      if(exclude) return !roles.some( (role: string) => myRoles.find((myRole: IUserRole) => role === myRole.name));
      if(!exclude) return roles.some( (role: string) => myRoles.find((myRole: IUserRole) => role === myRole.name));
    }else{
      console.log(roles, myRoles);
      if(exclude) return !roles.some( (role: string) => role === myRoles.name);
      if(!exclude) return roles.some( (role: string) => role === myRoles.name);
    }
  }
}
