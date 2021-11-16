import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { ScheduleResolverService, SchedulesResolverService } from '@shared/services/schedule-resolver.service';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { AvailableEmployeesResolverService } from '@shared/services/employee-resolver.service';
import { PeriodResolverService } from '@shared/services/period-resolver.service';

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
      path: 'crear',
      component: FormComponent,
      canActivate: [ CanPermissionGuard ],
      resolve: { employees: AvailableEmployeesResolverService},
      data: {
        can: ['period', 'create']
      }
    },{
      path: ':id/crear',
      component: FormComponent,
      canActivate: [ CanPermissionGuard ],
      resolve: { employees: AvailableEmployeesResolverService,
                  schedule: ScheduleResolverService},
      data: {
        can: ['period', 'create']
      }
    },{
      path: ':id/editar/:period_id',
      component: FormComponent,
      canActivate: [ CanPermissionGuard ],
      resolve: { employees: AvailableEmployeesResolverService,
                  schedule: ScheduleResolverService,
                  period: PeriodResolverService},
      data: {
        can: ['period', 'update']
      }
    },{
      path: 'planificacion',
      loadChildren: () => import('@root/app/modules/planning/planning.module').then(m => m.PlanningModule)
    },{
      path: 'periodo',
      loadChildren: () => import('@root/app/modules/period/period.module').then(m => m.PeriodModule)
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
  FormComponent
  // ShowComponent
];