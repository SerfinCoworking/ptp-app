import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guards
import { AuthGuard } from '@auth/guards/auth.guard';

// components
import { DashboardComponent } from '@dashboard/dashboard.component';
import { HomeComponent } from '@dashboard/components/home/home.component';
import { NotObjectiveRoleGuard } from '@permissions/guards/not-objective-role.guard';
import { NotFoundComponent } from '@shared/not-found/not-found.component';



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
        loadChildren: () => import('@root/app/modules/schedule/schedule.module').then(m => m.ScheduleModule)
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
      },
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/dashboard/404'}
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
];
