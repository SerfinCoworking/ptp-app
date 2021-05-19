import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsResolverService } from '@shared/services/news-resolver.service';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';



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
        resolve: { news: NewsResolverService},
        data: {
          can: ['news', 'read']
        }
      },
      {
        path: 'crear',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['news', 'create']
        }
      },
      {
        path: 'editar/:id',
        component: FormComponent,
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