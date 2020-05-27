import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guards
import { AuthGuard } from "@auth/guards/auth.guard";
// compoentns
import { DashboardComponent } from '@dashboard/dashboard.component';
import { HomeComponent } from '@dashboard/components/home/home.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
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
  HomeComponent
]
