import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guards
import { AuthGuard } from '@auth/guards/auth.guard';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';

// resolvers
import { ObjectiveResolverService } from '@shared/services/objective-resolver.service';
import { ScheduleResolverService } from '@shared/services/schedule-resolver.service';

// components
import { DashboardComponent } from '@dashboard/dashboard.component';
import { HomeComponent } from '@dashboard/components/home/home.component';
import { ObjectiveHeaderComponent } from '@dashboard/components/objective/objective-header.component';
import { ObjectiveComponent } from '@dashboard/components/objective/objective.component';
import { ObjectiveFormComponent } from '@dashboard/components/objective/objective-form/objective-form.component';
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
      }, 
      {
        path: 'objetivos',
        children: [
          {
            path: '',
            component: ObjectiveHeaderComponent,
            outlet: 'header-top'
          },
          {
            path: '',
            component: ObjectiveComponent,
            canActivate: [ CanPermissionGuard ],
            resolve: { objectives: ObjectiveResolverService},
            data: {
              can: ['objective', 'read']
            }
          },
          {
            path: 'crear',
            component: ObjectiveFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['objective', 'create']
            }
          },
          {
            path: 'editar/:id',
            component: ObjectiveFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['objective', 'update']
            }
          }
        ]
      }, {
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
            loadChildren: () => import('@dashboard/modules/schedule-template/schedule-template.module').then(m => m.ScheduleTemplateModule)
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
        path: 'empleados',
        loadChildren: () => import('@dashboard/modules/employee/employee.module').then(m => m.EmployeeModule)
      },{
        path: 'usuarios',
        loadChildren: () => import('@dashboard/modules/user/user.module').then(m => m.UserModule)
      },{
        path: 'liquidacion',
        loadChildren: () => import('@dashboard/modules/liquidation/liquidation.module').then(m => m.LiquidationModule)
      },{
        path: 'novedades',
        loadChildren: () => import('@dashboard/modules/news/news.module').then(m => m.NewsModule)
      },{
        path: 'roles',
        loadChildren: () => import('@dashboard/modules/role/role.module').then(m => m.RoleModule)
      },{
        path: 'movimientos',
        loadChildren: () => import('@dashboard/modules/movement/movement.module').then(m => m.MovementModule)
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
  ObjectiveHeaderComponent,
  ObjectiveComponent,
  ObjectiveFormComponent,
  ScheduleHeaderComponent,
  ScheduleComponent,
  ScheduleFormComponent,
  ScheduleShowComponent
];
