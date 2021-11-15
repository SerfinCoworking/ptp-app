import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { ObjectiveResolverService } from '@shared/services/objective-resolver.service';
import { PeriodMonitorResolverService, PeriodsResolverService } from '@shared/services/period-resolver.service';
import { ListComponent } from '../period/pages/list/list.component';
import { MonitorComponent } from './pages/monitor/monitor.component';


const routes: Routes = [{
  path: '',
  children: [{
    path: 'objetivo/:objectiveId',    
    component: ListComponent,
    canActivate: [ CanPermissionGuard ],
    resolve: { 
      objective: ObjectiveResolverService,
      periods: PeriodsResolverService
    },
    data: {
      can: ['period', 'read']
    }
  }, {
    path: ':periodId',    
    component: MonitorComponent,
    canActivate: [ CanPermissionGuard ],
    resolve: { period: PeriodMonitorResolverService},
    data: {
      can: ['period', 'read']
    }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodRoutingModule { }

export const routingComponents = [
  ListComponent,
  MonitorComponent
];