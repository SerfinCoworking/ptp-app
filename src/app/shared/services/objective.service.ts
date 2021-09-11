import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Observable } from 'rxjs';
import { IObjective } from '@shared/models/objective';
import { PaginationResult } from '@shared/models/pagination';
import { mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ObjectiveService{

  constructor(private http: HttpClient) { }

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

  createOrUpdate(objective: IObjective, id?: string){
    if(objective._id){
      return this.http.patch<IObjective>(`${environment.API_END_POINT}/objectives/${objective._id}`, objective);
    }else{
      return this.http.post<IObjective>(`${environment.API_END_POINT}/objectives`, objective)
    }
  }

  // DELETE
  deleteObjective(objectiveId: string): Observable<any>{
    return this.http.delete<any>(`${environment.API_END_POINT}/objectives/${objectiveId}`).pipe(
      mapTo(true)
    );
  }

}
