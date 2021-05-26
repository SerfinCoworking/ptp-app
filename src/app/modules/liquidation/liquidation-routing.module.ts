import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ListComponent } from '@module/liquidation/pages/list/list.component';
import { FormComponent } from '@module/liquidation/pages/form/form.component';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { StaffListComponent } from '@module/liquidation/pages/staff-list/staff-list.component';
import { EmployeeDetailComponent } from '@module/liquidation/pages/employee-detail/employee-detail.component';
import { LiquidationCreateResolverService, LiquidationDetailResolverService, LiquidationsResolverService } from '@shared/services/liquidation-resolver.service';

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
        resolve: { liquidations: LiquidationsResolverService},
        data: {
          can: ['liquidation', 'read']
        }
      },
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
        children: [
          {
            path: ':report_id/empleado/:id',
            component: EmployeeDetailComponent,
            canActivate: [ CanPermissionGuard ],
            resolve: { liquidation: LiquidationDetailResolverService},
            data: {
              can: ['liquidation', 'employeeDetail']
            }
          },
          {
            path: '',
            pathMatch: 'full',
            component: StaffListComponent,
            canActivate: [ CanPermissionGuard ],
            resolve: { liquidation: LiquidationCreateResolverService},
            data: {
              can: ['liquidation', 'create']
            }
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
  HeaderMenuComponent,
  ListComponent,
  FormComponent,
  StaffListComponent,
  EmployeeDetailComponent
];