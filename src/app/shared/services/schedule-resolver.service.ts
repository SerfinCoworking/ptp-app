import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleService } from '@shared/services/schedule.service';
import { ISchedule } from '@shared/models/schedule';
import { PaginationResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolverService implements Resolve<PaginationResult<ISchedule>> {

  constructor(private scheduleService: ScheduleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<ISchedule>> | Promise<PaginationResult<ISchedule>> | PaginationResult<ISchedule> {
    return this.scheduleService.list();
  }
}
