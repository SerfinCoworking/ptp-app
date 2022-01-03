import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login'
  },
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule)
  },{
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.module').then(m => m.DashboardModule)
  },{
    path: 'objetivo',
    loadChildren: () => import('@signed/signed.module').then(m => m.SignedModule)
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  NotFoundComponent
]
