import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleService } from '@shared/services/schedule.service';
import { ISchedule } from '@shared/models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolverService implements Resolve<ISchedule> {

  constructor(private scheduleService: ScheduleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISchedule> | Promise<ISchedule> | ISchedule {
    return this.scheduleService.list();
  }
}
