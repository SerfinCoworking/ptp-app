import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { IObjective } from '@interfaces/objective';
import { PaginationResult } from '@interfaces/pagination';
import { mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ObjectiveService implements OnDestroy{
  private subscription: Subscription = new Subscription();

  constructor(private http: HttpClient) { }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  // LIST
  getObjectives(search?: string, sort?: string, page?: number, limit?: number): Observable<PaginationResult<IObjective>>{
    let params = new HttpParams();
    if(typeof page !== 'undefined'){
      params = params.append('page', page.toString());
    }
    if(typeof limit !== 'undefined'){
      params = params.append('limit', limit.toString());
    }
    if(typeof search !== 'undefined'){
      params = params.append('search', search);
    }
    if(typeof sort !== 'undefined'){
      params = params.append('sort', sort);
    }

    return this.http.get<PaginationResult<IObjective>>(`${environment.API_END_POINT}/objectives`, {params: params});
  }

  // SHOW
  getObjective(objectiveId: string): Observable<IObjective>{
    return this.http.get<IObjective>(`${environment.API_END_POINT}/objectives/${objectiveId}`);
  }

  // CREATE
  addObjective(objective: IObjective): Observable<boolean>{
    return this.http.post<IObjective>(`${environment.API_END_POINT}/objectives`, objective).pipe(
      tap(() => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se agrego
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  // UPDATE
  updateObjective(objective: IObjective): Observable<boolean>{
    return this.http.patch<IObjective>(`${environment.API_END_POINT}/objectives/${objective._id}`, objective).pipe(
      tap((results: IObjective) => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se actualizo
        // correctamente un empleado
        // actualizamos el listado de empleados
      }),
      mapTo(true)
    );
  }

  // DELETE
  deleteObjective(objectiveId: string): Observable<any>{
    return this.http.delete<any>(`${environment.API_END_POINT}/objectives/${objectiveId}`).pipe(
      mapTo(true)
    );
  }

}
