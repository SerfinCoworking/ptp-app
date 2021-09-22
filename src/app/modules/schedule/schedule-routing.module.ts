import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { ScheduleResolverService, SchedulesResolverService } from '@shared/services/schedule-resolver.service';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { AvailableEmployeesResolverService } from '@shared/services/employee-resolver.service';
import { ObjectivesResolverService } from '@shared/services/objective-resolver.service';
import { PeriodResolverService, PlanningPeriodResolverService } from '@shared/services/period-resolver.service';
import { PlanningComponent } from './pages/planning/planning.component';

const routes: Routes = [{
  path: '',
  children: [ 
    {
      path: '',
      component: HeaderMenuComponent,
      outlet: 'header-top'
    },
    {
      path: '',
      component: ListComponent,
      canActivate: [ CanPermissionGuard ],
      resolve: { schedules: SchedulesResolverService},
      data: {
        can: ['schedule', 'read']
      }
    },{
      path: ':id/crear',
      component: FormComponent,
      canActivate: [ CanPermissionGuard ],
      resolve: { employees: AvailableEmployeesResolverService,
                  schedule: ScheduleResolverService,
                  objectives: ObjectivesResolverService},
      data: {
        can: ['schedule', 'create']
      }
    },{
      path: ':id/editar/:period_id',
      component: FormComponent,
      canActivate: [ CanPermissionGuard ],
      resolve: { employees: AvailableEmployeesResolverService,
                  schedule: ScheduleResolverService,
                  objectives: ObjectivesResolverService,
                  period: PeriodResolverService},
      data: {
        can: ['schedule', 'update']
      }
    },{
      path: 'planificacion/:period_id',
      component: PlanningComponent,
      canActivate: [ CanPermissionGuard ],
      resolve: { planning: PlanningPeriodResolverService},
      data: {
        can: ['schedule', 'update']
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }

export const routingComponents = [
  HeaderMenuComponent,
  ListComponent,
  FormComponent,
  PlanningComponent
  // ShowComponent
];