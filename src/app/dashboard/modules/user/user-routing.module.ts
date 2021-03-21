import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolverService, UsersResolverService } from '@dashboard/services/user-resolver.service';
import { HeaderMenuComponent } from '@dashboard/modules/user/components/header-menu/header-menu.component';
import { FormComponent } from '@dashboard/modules/user/pages/form/form.component';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { ListComponent } from './pages/list/list.component';
import { ShowComponent } from './pages/show/show.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { RolesResolverService } from '@dashboard/services/role-resolver.service';


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
        resolve: { users: UsersResolverService},
        data: {
          can: ['user', 'read']
        }
      },
      {
        path: 'crear',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['user', 'create']
        }
      },{
        path: ':id',
        component: ShowComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { user: UserResolverService},
        data: {
          can: ['user', 'read']
        }
      },{
        path: ':id/permisos',
        component: PermissionComponent,
        resolve: { user: UserResolverService, roles: RolesResolverService},
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['user', 'permission']
        }
      },{
        path: 'editar/:id',
        component: FormComponent,
        resolve: { user: UserResolverService},
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['user', 'update']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

export const routingComponents = [
  HeaderMenuComponent,
  ListComponent,
  ShowComponent,
  FormComponent,
  PermissionComponent
];