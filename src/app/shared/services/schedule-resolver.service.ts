import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleService } from '@shared/services/schedule.service';
import { ICalendarList } from '@shared/models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolverService implements Resolve<ICalendarList> {

  constructor(private scheduleService: ScheduleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICalendarList> | Promise<ICalendarList> | ICalendarList {
    return this.scheduleService.getSchedules();
  }
}
