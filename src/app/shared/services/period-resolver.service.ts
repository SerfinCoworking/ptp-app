import { Injectable } from '@angular/core';
import { IPeriod } from '@shared/models/schedule';
import { PeriodService } from './period.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginationResult } from '@shared/models/pagination';


// Get list of periods
@Injectable({
  providedIn: 'root'
})
export class PeriodsResolverService implements Resolve<PaginationResult<IPeriod>> {

  constructor(private periodService: PeriodService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginationResult<IPeriod>> | Promise<PaginationResult<IPeriod>> | PaginationResult<IPeriod> {
    const { id } = route.params;
    return this.periodService.getPeriods(id);
  }
}

// Get a period
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

// Get a period with monitor parsed
@Injectable({
  providedIn: 'root'
})
export class PeriodMonitorResolverService implements Resolve<IPeriod> {

  constructor(private periodService: PeriodService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPeriod> | Promise<IPeriod> | IPeriod {
    const { id } = route.params;
    return this.periodService.periodMonitoring(id);
  }
}

// Get a planning [edition of period: employee / events]
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
