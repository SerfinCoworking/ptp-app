import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '@interfaces/user';
import { PaginationResult } from '@interfaces/pagination';
import { mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  // LIST
  getUsers(search?: string, sort?: string, page?: number, limit?: number): Observable<PaginationResult<IUser>> {
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

    return this.http.get<PaginationResult<IUser>>(`${environment.API_END_POINT}/users`, {params});
  }

  // SHOW
  getUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.API_END_POINT}/users/${userId}`);
  }

  // CREATE
  addUser(user: IUser): Observable<boolean> {
    return this.http.post<IUser>(`${environment.API_END_POINT}/users`, user).pipe(
      tap(() => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se agrego
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  // UPDATE
  updateUser(user: IUser): Observable<boolean> {
    return this.http.patch<IUser>(`${environment.API_END_POINT}/users/${user._id}`, user).pipe(
      tap((results: IUser) => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se actualizo
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  updatePermissions(user: IUser): Observable<boolean> {
    return this.http.patch<IUser>(`${environment.API_END_POINT}/users/${user._id}/permissions`, user).pipe(
      tap((results: IUser) => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se actualizo
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  // DELETE
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${environment.API_END_POINT}/users/${userId}`).pipe(
      mapTo(true)
    );
  }

}
