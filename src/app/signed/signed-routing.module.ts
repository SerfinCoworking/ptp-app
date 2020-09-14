import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { HasRoleGuard } from '@permissions/guards/has-role.guard';
import { FormComponent } from './components/form/form.component';
import { SignedComponent } from './signed.component';



const routes: Routes = [
  {
    path: 'objetivo',
    component: SignedComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['objective', '']
    },
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
