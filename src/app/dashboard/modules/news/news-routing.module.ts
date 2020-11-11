import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { NotObjectiveRoleGuard } from '@permissions/guards/not-objective-role.guard';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { NewsHeaderComponent } from './news-header.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, NotObjectiveRoleGuard],
    children: [
      {
        path: 'novedades',
        // component: FormComponent,
        children: [ 
          {
            path: '',
            component: NewsHeaderComponent,
            outlet: 'header-top'
          },
          {
            path: 'crear',
            component: NewsFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['news', 'create']
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
export class NewsRoutingModule { }

export const routingComponents = [
  NewsFormComponent,
  NewsHeaderComponent
];