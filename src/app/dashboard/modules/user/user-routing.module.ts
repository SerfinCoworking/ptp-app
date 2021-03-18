import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolverService } from '@dashboard/services/user-resolver.service';
import { UserComponent } from '@dashboard/modules/user/user.component';
import { UserHeaderComponent } from '@dashboard/modules/user/user-header.component';
import { UserFormComponent } from '@dashboard/modules/user/user-form/user-form.component';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';


const routes: Routes = [

  {
    path: '',
    children: [ 
      {
        path: '',
        component: UserHeaderComponent,
        outlet: 'header-top'
      },
      {
        path: '',
        component: UserComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { users: UserResolverService},
        data: {
          can: ['user', 'read']
        }
      },
      {
        path: 'crear',
        component: UserFormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['user', 'create']
        }
      },
      {
        path: 'editar/:id',
        component: UserFormComponent,
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
  UserHeaderComponent,
  UserComponent,
  UserFormComponent
];