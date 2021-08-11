import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsConceptResolverService, NewsArrResolverService, NewsResolverService } from '@shared/services/news-resolver.service';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { AvailableEmployeesResolverService } from '@shared/services/employee-resolver.service';



const routes: Routes = [
  {
    path: '',
    children: [ 
      {
        path: '',
        component: HeaderMenuComponent,
        outlet: 'header-top'
      },
      {
        path: '',
        component: ListComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { news: NewsArrResolverService },
        data: {
          can: ['news', 'read']
        }
      },
      {
        path: 'crear',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { 
          concepts: NewsConceptResolverService,
          employees: AvailableEmployeesResolverService
        },
        data: {
          can: ['news', 'create']
        }
      },
      {
        path: 'editar/:id',
        component: FormComponent,
        resolve: { 
          concepts: NewsConceptResolverService, 
          news: NewsResolverService,
          employees: AvailableEmployeesResolverService 
        },
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['news', 'update']
        }
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
  FormComponent,
  ListComponent,
  HeaderMenuComponent
];