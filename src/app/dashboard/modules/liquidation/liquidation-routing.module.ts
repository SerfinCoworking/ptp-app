import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiquidationFormComponent } from '@dashboard/modules/liquidation/components/liquidation-form/liquidation-form.component';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { StaffLiquidationComponent } from './components/staff-liquidation/staff-liquidation.component';


const routes: Routes = [
  {
    path: '',
    children: [ 
      {
        path: 'generar',
        component: LiquidationFormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['liquidation', 'create']
        }
      },
      {
        path: 'reporte',
        component: StaffLiquidationComponent,
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
  LiquidationFormComponent,
  StaffLiquidationComponent
];