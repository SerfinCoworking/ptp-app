import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@root/environments/environment';
import ILiquidation from '@interfaces/liquidation';

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {

  private generatedLiquidations: BehaviorSubject<ILiquidation[]>;

  constructor(private http: HttpClient) { 
    this.generatedLiquidations = new BehaviorSubject<ILiquidation[]>([]);

  }

  // LIST
  getLiquidation(fromDate: string, toDate: string): Observable<ILiquidation[]> {
    let params = new HttpParams();
    if (typeof fromDate !== 'undefined') {
      params = params.append('fromDate', fromDate);
    }
    if (typeof toDate !== 'undefined') {
      params = params.append('toDate', toDate.toString());
    }

    return this.http.get<ILiquidation[]>(`${environment.API_END_POINT}/liquidation`, {params: params});
  }
}
