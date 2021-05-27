import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@root/environments/environment';
import ILiquidation from '@interfaces/liquidation';
import { PaginationResult } from '@interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {

  private _liquidation: BehaviorSubject<ILiquidation>;

  constructor(private http: HttpClient) { 
    this._liquidation = new BehaviorSubject<ILiquidation>({} as ILiquidation);
  }
  
  // LIST
  list(search?: string, sort?: string, page?: number, limit?: number): Observable<PaginationResult<ILiquidation>>{
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
    this._liquidation.next({} as ILiquidation);
    return this.http.get<PaginationResult<ILiquidation>>(`${environment.API_END_POINT}/liquidations`, {params: params});
  }

  // CREATE
  create(fromDate: string, toDate: string, employeeId: string): Observable<ILiquidation> {
    let params = new HttpParams();
    if (typeof fromDate !== 'undefined') {
      params = params.append('fromDate', fromDate);
    }
    if (typeof toDate !== 'undefined') {
      params = params.append('toDate', toDate.toString());
    }
    if (typeof employeeId !== 'undefined') {
      params = params.append('employeeId', employeeId);
    }
    return this.http.get<ILiquidation>(`${environment.API_END_POINT}/liquidation`, {params: params});
  }
  
  // SHOW
  show(id: string): Observable<ILiquidation> {
    return this.http.get<ILiquidation>(`${environment.API_END_POINT}/liquidation/${id}`);
  }

  destroy(liquidationId: string){
    return this.http.delete<any>(`${environment.API_END_POINT}/liquidation/${liquidationId}`);
  }
  
  setLiquidation(value: ILiquidation){
    this._liquidation.next(value);
  }

  get liquidation(): Observable<ILiquidation>{
    return this._liquidation.asObservable();
  }
}
