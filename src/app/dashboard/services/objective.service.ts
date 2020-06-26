import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { IObjective } from '@interfaces/objective';
import { PaginationResult } from '@interfaces/pagination';
import { mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ObjectiveService implements OnDestroy{
  private subscription: Subscription = new Subscription();
  private _objectivesList: BehaviorSubject<PaginationResult<IObjective>> = new BehaviorSubject<PaginationResult<IObjective>>( {} as PaginationResult<IObjective>);
  private _isVisibleObjective: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _Objective: BehaviorSubject<IObjective> = new BehaviorSubject<IObjective>({} as IObjective);

  constructor(private http: HttpClient) { }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  // LIST
  getObjectives(search?: string, sort?: string, page?: number, limit?: number): Observable<boolean>{
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

    return this.http.get<PaginationResult<IObjective>>(`${environment.API_END_POINT}/objectives`, {params: params}).pipe(
      tap((results: PaginationResult<IObjective>) => this.setObjectivesList(results)),
      mapTo(true)
    );
  }

  // SHOW
  getObjective(objectiveId: string): Observable<boolean>{
    const params = {id: objectiveId};
    return this.http.get<IObjective>(`${environment.API_END_POINT}/objectives/${objectiveId}`).pipe(
      tap((results: IObjective) => this.showObjective(results)),
      mapTo(true)
    );
  }

  // CREATE
  addObjective(objective: IObjective): Observable<boolean>{
    return this.http.post<IObjective>(`${environment.API_END_POINT}/objectives`, objective).pipe(
      tap(() => {
        // en este punto podemos agregar una llamada al servicio de notificacion que se agrego
        // correctamente un empleado
        // actualizamos el listado de empleados
        this.subscription.add(
          this.getObjectives().subscribe(success => {
            console.log("se ha agregado un nuevo empleado");
        }));
      }),
      mapTo(true)
    );
  }

  // UPDATE
  updateObjective(objective: IObjective): Observable<boolean>{
    return this.http.patch<IObjective>(`${environment.API_END_POINT}/objectives/${objective._id}`, objective).pipe(
      tap((results: IObjective) => {
        this.showObjective(results);
        // en este punto podemos agregar una llamada al servicio de notificacion que se actualizo
        // correctamente un empleado
        // actualizamos el listado de empleados
        this.subscription.add(
        this.getObjectives().subscribe(success => {
          console.log("se ha actualizado el empleado");
        }));
      }),
      mapTo(true)
    );
  }

  // DELETE
  deleteObjective(objectiveId: string): Observable<any>{
    return this.http.delete<any>(`${environment.API_END_POINT}/objectives/${objectiveId}`);
  }

  setObjectivesList(results: PaginationResult<IObjective>){
    this._objectivesList.next(results);
  }

  private showObjective(Objective: IObjective){
    this._Objective.next(Objective);
    this._isVisibleObjective.next(true);
  }

  hideObjective(){
    this._Objective.next({} as IObjective);
    this._isVisibleObjective.next(false);
  }

  get objective(): Observable<IObjective>{
    return this._Objective.asObservable();
  }

  get objectives(): Observable<PaginationResult<IObjective>>{
    return this._objectivesList.asObservable();
  }

  get isVisibleObjective(): Observable<boolean>{
    return this._isVisibleObjective.asObservable();
  }

}
