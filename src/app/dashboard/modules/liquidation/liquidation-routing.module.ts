import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { FormComponent } from '@dashboard/modules/liquidation/components/form/form.component';
import { NotObjectiveRoleGuard } from '@permissions/guards/not-objective-role.guard';
import { StaffLiquidationComponent } from './components/staff-liquidation/staff-liquidation.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, NotObjectiveRoleGuard],
    children: [
      {
        path: 'liquidacion',
        // component: FormComponent,
        children: [ 
          {
            path: 'generar',
            component: FormComponent
          },
          {
            path: 'reporte',
            component: StaffLiquidationComponent
          },

        ]
      }
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
  StaffLiquidationComponent
];