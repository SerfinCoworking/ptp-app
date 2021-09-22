import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { PlanningPeriodResolverService } from '@shared/services/period-resolver.service';
import { FormComponent } from './pages/form/form.component';


const routes: Routes = [{
  path: '',
  children: [ {
    path: ':period_id',    
    component: FormComponent,
    canActivate: [ CanPermissionGuard ],
    resolve: { planning: PlanningPeriodResolverService},
    data: {
      can: ['schedule', 'update']
    }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }

export const routingComponents = [
  FormComponent
];