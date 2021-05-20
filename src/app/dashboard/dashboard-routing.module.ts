import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guards
import { AuthGuard } from '@auth/guards/auth.guard';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';

// resolvers
import { ScheduleResolverService } from '@shared/services/schedule-resolver.service';

// components
import { DashboardComponent } from '@dashboard/dashboard.component';
import { HomeComponent } from '@dashboard/components/home/home.component';
import { ScheduleHeaderComponent } from './components/schedule/schedule-header.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleFormComponent } from './components/schedule/schedule-form/schedule-form.component';
import { NotObjectiveRoleGuard } from '@permissions/guards/not-objective-role.guard';
import { ScheduleShowComponent } from './components/schedule/schedule-show/schedule-show.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard, NotObjectiveRoleGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },{
        path: 'agendas',
        children: [
          {
            path: '',
            component: ScheduleHeaderComponent,
            outlet: 'header-top'
          },
          {
            path: '',
            component: ScheduleComponent,
            canActivate: [ CanPermissionGuard ],
            resolve: { calendarList: ScheduleResolverService},
            data: {
              can: ['schedule', 'read']
            }
          },
          {
            path: 'crear',
            component: ScheduleFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['schedule', 'create']
            }
          },
          {
            path: 'templates',
            loadChildren: () => import('@root/app/modules/schedule-template/schedule-template.module').then(m => m.ScheduleTemplateModule)
          },
          {
            path: ':id',
            component:ScheduleShowComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ["schedule", "read"]
            }
          },
          {
            path: 'editar/:id',
            component:ScheduleFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ["schedule", "update"]
            }
          }
        ]
      },{
        path: 'objetivos',
        loadChildren: () => import('@root/app/modules/objective/objective.module').then(m => m.ObjectiveModule)
      },{
        path: 'empleados',
        loadChildren: () => import('@root/app/modules/employee/employee.module').then(m => m.EmployeeModule)
      },{
        path: 'usuarios',
        loadChildren: () => import('@root/app/modules/user/user.module').then(m => m.UserModule)
      },{
        path: 'liquidacion',
        loadChildren: () => import('@root/app/modules/liquidation/liquidation.module').then(m => m.LiquidationModule)
      },{
        path: 'novedades',
        loadChildren: () => import('@root/app/modules/news/news.module').then(m => m.NewsModule)
      },{
        path: 'roles',
        loadChildren: () => import('@root/app/modules/role/role.module').then(m => m.RoleModule)
      },{
        path: 'movimientos',
        loadChildren: () => import('@root/app/modules/movement/movement.module').then(m => m.MovementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

export const routingComponents = [
  DashboardComponent,
  HomeComponent,
  ScheduleHeaderComponent,
  ScheduleComponent,
  ScheduleFormComponent,
  ScheduleShowComponent
];
