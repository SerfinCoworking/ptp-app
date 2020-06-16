import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guards
import { AuthGuard } from "@auth/guards/auth.guard";
import { CanPermissionGuard } from "@permissions/guards/can-permission.guard";
// compoentns
import { DashboardComponent } from '@dashboard/dashboard.component';
import { HomeComponent } from '@dashboard/components/home/home.component';
import { EmployeeComponent } from '@dashboard/components/employee/employee.component';
import { EmployeeHeaderComponent } from '@dashboard/components/employee/employee-header.component';
import { EmployeeResolverService } from './services/employee-resolver.service';



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
            component:EmployeeHeaderComponent,
            resolve: { employeeIsLoaded: EmployeeResolverService},
            outlet: 'header-top'
          },
          {
            path: '',
            component:EmployeeComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ["employee", "list"]
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
  EmployeeHeaderComponent
]
