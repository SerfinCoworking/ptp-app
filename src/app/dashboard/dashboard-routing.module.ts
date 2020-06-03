import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guards
import { AuthGuard } from "@auth/guards/auth.guard";
import { CanPermissionGuard } from "@permissions/guards/can-permission.guard";
// compoentns
import { DashboardComponent } from '@dashboard/dashboard.component';
import { HomeComponent } from '@dashboard/components/home/home.component';
import { EmployeeComponent } from '@dashboard/components/employee/employee.component';
import { EmployeeListComponent } from '@dashboard/components/employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from '@dashboard/components/employee/employee-form/employee-form.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'empleados',
        children: [
          {
            path: '',
            component:EmployeeComponent,
            outlet: 'header-top'
          },
          {
            path: '',
            component:EmployeeListComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ["employee", "list"]
            }
          },
          {
            path: 'crear',
            component:EmployeeFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ["employee", "create"]
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
  EmployeeListComponent,
  EmployeeFormComponent
]
