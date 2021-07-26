import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import ILiquidation from '@shared/models/liquidation';
import { LiquidationService } from './liquidation.service';
import { PaginationResult } from '@shared/models/pagination';

// Resolve Listado
@Injectable({
  providedIn: 'root'
})

export class LiquidationsResolverService implements Resolve<PaginationResult<ILiquidation>> {

  constructor(private liquidationService: LiquidationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<ILiquidation>> | Promise<PaginationResult<ILiquidation>> | PaginationResult<ILiquidation> {
  
    return this.liquidationService.list();
  }
}

// Resolve create
@Injectable({
  providedIn: 'root'
})
export class LiquidationCreateResolverService implements Resolve<ILiquidation> {

  constructor(private liquidationService: LiquidationService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILiquidation> | Promise<ILiquidation> | ILiquidation {
    const { fromDate, toDate, employeeIds } = route.queryParams;
    return this.liquidationService.create(fromDate, toDate, employeeIds);
  }
}

// Resolve employeeDetail
@Injectable({
  providedIn: 'root'
})

export class LiquidationDetailResolverService implements Resolve<ILiquidation> {
  
  constructor(private liquidationService: LiquidationService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILiquidation> | Promise<ILiquidation> | ILiquidation {
    const { report_id } = route.params;
    let liquidation: ILiquidation;

    this.liquidationService.liquidation.subscribe((liq: ILiquidation) => {
      liquidation = liq;
    });
    if(!!liquidation._id) return liquidation;

    return this.liquidationService.show(report_id);
  }
}