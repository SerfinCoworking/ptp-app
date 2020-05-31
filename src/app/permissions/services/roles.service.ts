import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '@auth/services/auth.service';


interface IGrant {
  resource: string;
  action: string;
  attributes: string[];
};

interface IPermissions {
  role: string;
  grants: IGrant[];
};

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  private readonly apiEndPoint = environment.API_END_POINT;
  private permissions: IPermissions[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  async load(){
    await this.http.get<any>(`${this.apiEndPoint}/roles`).pipe(
      tap(async roles => await this.setPermissions(roles)),
      catchError(async (error) => {
        console.log(error);
      })
    ).toPromise();
  }

  private async setPermissions(roles): Promise<void> {
    const grantList: any = [];

    await Promise.all( roles.map( async (role) => {
      grantList[`${role.name}`] = role.grants;
    }));

    this.permissions = grantList;

  }

  get allPermissions(): IPermissions[]{
    return this.permissions;
  }

  async permitBy(resource: string, action?: string | null, attribute?: string): Promise<boolean>{
    const roleName: string = this.authService.getLoggedRole();
    let filterPerms: IGrant[] = [];

    if(!this.allPermissions[roleName].length) return false; // role exist and has at least permissions

    // role has permissions in request resource
    filterPerms = this.allPermissions[roleName].filter(
      (perm) => {
        return perm.resource === resource;
      }
    );

    // role has permission in request action
    filterPerms = filterPerms.filter(
      (perm) => {
        return action ? (perm.action === action || perm.action === '*') : perm.action === '*';
      }
    );

    // role has permission in request attributes
    filterPerms = filterPerms.filter(
      (perm) => {
        return attribute ? (perm.attributes.includes(attribute) || perm.attributes.includes('*')) : perm.attributes.includes('*');
      }
    );

    return filterPerms.length > 0;
  }
}
