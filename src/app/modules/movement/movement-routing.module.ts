import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { MovementsResolverService } from '@shared/services/movement-resolver.service';
import { ListComponent } from './pages/list/list.component';


const routes: Routes = [
  {
    path: '',
    children: [ 
      {
        path: '',
        component: ListComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { movements: MovementsResolverService},
        data: {
          can: ['movement', 'read']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementRoutingModule { }

export const routingComponents = [
  ListComponent
];