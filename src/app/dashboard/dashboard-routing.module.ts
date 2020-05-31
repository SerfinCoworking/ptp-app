import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guards
import { AuthGuard } from "@auth/guards/auth.guard";
import { CanPermissionGuard } from "@permissions/guards/can-permission.guard";
// compoentns
import { DashboardComponent } from '@dashboard/dashboard.component';
import { HomeComponent } from '@dashboard/components/home/home.component';
import { EmployeeListComponent } from '@dashboard/components/employee/employee-list/employee-list.component';


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
        component:EmployeeListComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ["employee", "list"]
        }
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
  EmployeeListComponent
]
