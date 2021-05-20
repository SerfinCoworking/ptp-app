import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { ObjectiveResolverService, ObjectivesResolverService } from '@shared/services/objective-resolver.service';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { ShowComponent } from './pages/show/show.component';


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
        resolve: { objectives: ObjectivesResolverService},
        data: {
          can: ['objective', 'read']
        }
      },
      {
        path: 'crear',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['objective', 'create']
        }
      },{
        path: ':id',
        component: ShowComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { objective: ObjectiveResolverService},
        data: {
          can: ['objective', 'read']
        }
      },{
        path: 'editar/:id',
        component: FormComponent,
        resolve: { objective: ObjectiveResolverService},
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['objective', 'update']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectiveRoutingModule { }

export const routingComponents = [
  HeaderMenuComponent,
  ListComponent,
  FormComponent,
  ShowComponent
];