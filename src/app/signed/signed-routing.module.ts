import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { IsObjectiveRoleGuard } from '@permissions/guards/is-objective-role.guard';
import { FormComponent } from './components/form/form.component';
import { SignedComponent } from './signed.component';



const routes: Routes = [
  {
    path: '',
    component: SignedComponent,
    canActivate: [AuthGuard, IsObjectiveRoleGuard],
    children: [
      {
        path: 'home',
        component: FormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignedRoutingModule { }

export const signedRouteModules = [
  SignedComponent,
  FormComponent
];
