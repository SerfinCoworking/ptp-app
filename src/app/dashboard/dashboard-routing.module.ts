import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guards
import { AuthGuard } from '@auth/guards/auth.guard';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';

// resolvers
import { EmployeeResolverService } from '@dashboard/services/employee-resolver.service';
import { ObjectiveResolverService } from '@dashboard/services/objective-resolver.service';
import { ScheduleResolverService } from '@dashboard/services/schedule-resolver.service';
import { UserResolverService } from '@dashboard/services/user-resolver.service';

// components
import { DashboardComponent } from '@dashboard/dashboard.component';
import { HomeComponent } from '@dashboard/components/home/home.component';
import { EmployeeComponent } from '@dashboard/components/employee/employee.component';
import { EmployeeHeaderComponent } from '@dashboard/components/employee/employee-header.component';
import { EmployeeFormComponent } from '@dashboard/components/employee/employee-form/employee-form.component';
import { ObjectiveHeaderComponent } from '@dashboard/components/objective/objective-header.component';
import { ObjectiveComponent } from '@dashboard/components/objective/objective.component';
import { ObjectiveFormComponent } from '@dashboard/components/objective/objective-form/objective-form.component';
import { ScheduleHeaderComponent } from './components/schedule/schedule-header.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleFormComponent } from './components/schedule/schedule-form/schedule-form.component';
import { UserComponent } from '@dashboard/components/user/user.component';
import { UserHeaderComponent } from '@dashboard/components/user/user-header.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'empleados',
        children: [
          {
            path: '',
            component: EmployeeHeaderComponent,
            outlet: 'header-top'
          },
          {
            path: '',
            component: EmployeeComponent,
            canActivate: [ CanPermissionGuard ],
            resolve: { employees: EmployeeResolverService},
            data: {
              can: ['employee', 'list']
            }
          },
          {
            path: 'crear',
            component: EmployeeFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['employee', 'create']
            }
          },
          {
            path: 'editar/:id',
            component: EmployeeFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['employee', 'edit']
            }
          }
        ]
      }, {
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
              can: ['objective', 'list']
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
              can: ['objective', 'edit']
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
              can: ['schedule', 'list']
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
            path: 'editar/:id',
            component:ScheduleFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ["schedule", "edit"]
            }
          }
        ]
      }, {
        path: 'usuarios',
        children: [
          {
            path: '',
            component: UserHeaderComponent,
            outlet: 'header-top'
          },
          {
            path: '',
            component: UserComponent,
            canActivate: [ CanPermissionGuard ],
            resolve: { users: UserResolverService},
            data: {
              can: ['user', 'list']
            }
          },
          {
            path: 'crear',
            component: UserFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['user', 'create']
            }
          },
          {
            path: 'editar/:id',
            component: UserFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['user', 'edit']
            }
          }
        ]
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
  EmployeeComponent,
  EmployeeHeaderComponent,
  EmployeeFormComponent,
  ObjectiveHeaderComponent,
  ObjectiveComponent,
  ObjectiveFormComponent,
  ScheduleHeaderComponent,
  ScheduleComponent,
  ScheduleFormComponent,
  UserHeaderComponent,
  UserComponent,
  UserFormComponent
];
