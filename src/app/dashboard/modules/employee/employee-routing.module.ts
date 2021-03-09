import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { EmployeesResolverService, EmployeeResolverService } from '@dashboard/services/employee-resolver.service';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
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
        resolve: { employees: EmployeesResolverService},
        data: {
          can: ['employee', 'list']
        }
      },
      {
        path: ':id',
        component: ShowComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { employee: EmployeeResolverService},
        data: {
          can: ['employee', 'show']
        }
      },{
        path: 'crear',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['employee', 'create']
        }
      },{
        path: 'editar/:id',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['employee', 'edit']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

export const routingComponents = [
  ListComponent,
  FormComponent,
  ShowComponent
];