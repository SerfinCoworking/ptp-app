import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { NewsResolverService } from '@dashboard/services/news-resolver.service';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { NotObjectiveRoleGuard } from '@permissions/guards/not-objective-role.guard';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsHeaderComponent } from './news-header.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, NotObjectiveRoleGuard],
    children: [
      {
        path: 'novedades',
        children: [ 
          {
            path: '',
            component: NewsHeaderComponent,
            outlet: 'header-top'
          },
          {
            path: '',
            component: NewsListComponent,
            canActivate: [ CanPermissionGuard ],
            resolve: { news: NewsResolverService},
            data: {
              can: ['news', 'list']
            }
          },
          {
            path: 'crear',
            component: NewsFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['news', 'create']
            }
          },
          {
            path: 'editar/:id',
            component: NewsFormComponent,
            canActivate: [ CanPermissionGuard ],
            data: {
              can: ['news', 'edit']
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