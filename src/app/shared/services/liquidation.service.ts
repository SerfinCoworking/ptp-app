import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@root/environments/environment';
import ILiquidation, { ILiquidatedNews } from '@shared/models/liquidation';
import { PaginationResult } from '@shared/models/pagination';
import IEmployeeLiquidated from '@shared/models/employee-liquidated.interface';
import IEmployeeSigned from '@shared/models/employee-signed.interface.';

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
  create(fromDate: string, toDate: string, employeeIds: string): Observable<{message: string, liquidation: ILiquidation}> {
    let params = new HttpParams();
    if (typeof fromDate !== 'undefined') {
      params = params.append('fromDate', fromDate);
    }
    if (typeof toDate !== 'undefined') {
      params = params.append('toDate', toDate.toString());
    }
    if (typeof employeeIds !== 'undefined') {
      params = params.append('employeeIds', employeeIds);
    }
    return this.http.get<{message: string, liquidation: ILiquidation}>(`${environment.API_END_POINT}/liquidation`, {params: params});
  }
  
  // SHOW
  show(id: string): Observable<ILiquidation> {
    return this.http.get<ILiquidation>(`${environment.API_END_POINT}/liquidation/${id}`);
  }
  
  employeeDetail(id: string, employeeId: string): Observable<IEmployeeLiquidated> {
    return this.http.get<IEmployeeLiquidated>(`${environment.API_END_POINT}/liquidation/${id}/${employeeId}`);
  }
  
  liquidatedNews(id: string): Observable<ILiquidatedNews> {
    return this.http.get<ILiquidatedNews>(`${environment.API_END_POINT}/liquidation/liquidated-news/${id}`);
  }

  destroy(liquidationId: string){
    return this.http.delete<any>(`${environment.API_END_POINT}/liquidation/${liquidationId}`);
  }
  
  setLiquidation(value: ILiquidation){
    this._liquidation.next(value);
  }

  showSigneds(employee_liquidated_id: string): Observable<IEmployeeSigned>{
    return this.http.get<IEmployeeSigned>(`${environment.API_END_POINT}/show/${employee_liquidated_id}`);
  }

  getSigneds(fromDate: string, toDate: string, employeeId: string, employee_liquidated_id: string): Observable<IEmployeeSigned>{
    let params = new HttpParams();
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    params = params.append('employeeId', employeeId);
    params = params.append('employee_liquidated_id', employee_liquidated_id);
    return this.http.get<IEmployeeSigned>(`${environment.API_END_POINT}/get-employee-signeds`, {params});
  }

  get liquidation(): Observable<ILiquidation>{
    return this._liquidation.asObservable();
  }
}
