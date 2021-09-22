import { Injectable } from '@angular/core';
import { IPeriod } from '@shared/models/schedule';
import { PeriodService } from './period.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PeriodResolverService implements Resolve<IPeriod> {

  constructor(private periodService: PeriodService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPeriod> | Promise<IPeriod> | IPeriod {
    const { period_id } = route.params;
    return this.periodService.period(period_id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlanningPeriodResolverService implements Resolve<any> {

  constructor(private periodService: PeriodService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const { period_id } = route.params;
    return this.periodService.periodPlanning(period_id);
  }
}
