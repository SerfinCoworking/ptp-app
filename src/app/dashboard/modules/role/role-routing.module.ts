import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { RolesResolverService, RoleResolverService } from '@dashboard/services/role-resolver.service';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
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
        resolve: { roles: RolesResolverService},
        data: {
          can: ['role', 'read']
        }
      },{
        path: 'crear',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['role', 'create']
        }
      },{
        path: 'editar/:id',
        component: FormComponent,
        resolve: { role: RoleResolverService},
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['role', 'update']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }


export const routingComponents = [
  HeaderMenuComponent,
  ListComponent,
  FormComponent,
];