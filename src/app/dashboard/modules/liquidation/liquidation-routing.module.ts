import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { FormComponent } from '@dashboard/modules/liquidation/components/form/form.component';
import { NotObjectiveRoleGuard } from '@permissions/guards/not-objective-role.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, NotObjectiveRoleGuard],
    children: [
      {
        path: 'liquidacion-form',
        component: FormComponent
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
  FormComponent
];