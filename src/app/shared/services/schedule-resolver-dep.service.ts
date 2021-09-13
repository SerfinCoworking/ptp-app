import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleDepService } from '@shared/services/schedule-dep.service';
import { ICalendarList } from '@shared/models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolverDepService implements Resolve<ICalendarList> {

  constructor(private scheduleService: ScheduleDepService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICalendarList> | Promise<ICalendarList> | ICalendarList {
    return this.scheduleService.getSchedules();
  }
}
