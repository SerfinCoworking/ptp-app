import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { PeriodMonitorResolverService, PeriodsResolverService } from '@shared/services/period-resolver.service';
import { ListComponent } from '../period/pages/list/list.component';
import { MonitorComponent } from './pages/monitor/monitor.component';


const routes: Routes = [{
  path: '',
  children: [ {
    path: 'objetivo/:id',    
    component: ListComponent,
    canActivate: [ CanPermissionGuard ],
    resolve: { periods: PeriodsResolverService},
    data: {
      can: ['schedule', 'read']
    }
  }, {
    path: ':id',    
    component: MonitorComponent,
    canActivate: [ CanPermissionGuard ],
    resolve: { period: PeriodMonitorResolverService},
    data: {
      can: ['schedule', 'read']
    }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodRoutingModule { }

export const routingComponents = [
  ListComponent
];