import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from '@dashboard/modules/liquidation/pages/form/form.component';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { StaffListComponent } from './pages/staff-list/staff-list.component';


const routes: Routes = [
  {
    path: '',
    children: [ 
      {
        path: 'generar',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['liquidation', 'create']
        }
      },
      {
        path: 'reporte',
        component: StaffListComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['liquidation', 'create']
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiquidationRoutingModule { }

export const routingComponents = [
  FormComponent,
  StaffListComponent
];