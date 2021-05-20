import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { ObjectiveResolverService } from '@shared/services/objective-resolver.service';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ListComponent } from './pages/list/list.component';


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
        resolve: { objectives: ObjectiveResolverService},
        data: {
          can: ['objective', 'read']
        }
      },
      // {
      //   path: 'crear',
      //   component: FormComponent,
      //   canActivate: [ CanPermissionGuard ],
      //   data: {
      //     can: ['role', 'create']
      //   }
      // },{
      //   path: 'editar/:id',
      //   component: FormComponent,
      //   resolve: { role: RoleResolverService},
      //   canActivate: [ CanPermissionGuard ],
      //   data: {
      //     can: ['role', 'update']
      //   }
      // }
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
  // FormComponent,
];