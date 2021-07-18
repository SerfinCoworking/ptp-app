import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable } from 'rxjs';
import { PaginationResult } from '@shared/models/pagination';
import { mapTo, tap } from 'rxjs/operators';
import IRole from '@shared/models/role';


@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http: HttpClient) { }

  // LIST
  getRoles(search?: string, sort?: string, page?: number, limit?: number): Observable<PaginationResult<IRole>> {
    let params = new HttpParams();
    if (typeof page !== 'undefined') {
      params = params.append('page', page.toString());
    }
    if (typeof limit !== 'undefined') {
      params = params.append('limit', limit.toString());
    }
    if (typeof search !== 'undefined') {
      params = params.append('search', search);
    }
    if (typeof sort !== 'undefined') {
      params = params.append('sort', sort);
    }

    return this.http.get<PaginationResult<IRole>>(`${environment.API_END_POINT}/roles`, {params});
  }

  // SHOW
  getRole(roleId: string): Observable<IRole> {
    return this.http.get<IRole>(`${environment.API_END_POINT}/roles/${roleId}`);
  }

  // CREATE
  addRole(role: IRole): Observable<boolean> {
    return this.http.post<IRole>(`${environment.API_END_POINT}/roles`, role).pipe(
      tap(() => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se agrego
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  // UPDATE
  updateRole(role: IRole): Observable<boolean> {
    return this.http.patch<IRole>(`${environment.API_END_POINT}/roles/${role._id}`, role).pipe(
      tap((results: IRole) => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se actualizo
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  // DELETE
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete<any>(`${environment.API_END_POINT}/roles/${roleId}`).pipe(
      mapTo(true)
    );
  }

}
