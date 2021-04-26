import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from '@dashboard/modules/liquidation/pages/form/form.component';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { StaffListComponent } from './pages/staff-list/staff-list.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { LiquidationCreateResolverService, LiquidationDetailResolverService } from '@shared/services/liquidation-resolver.service';


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
  FormComponent,
  StaffListComponent,
  EmployeeDetailComponent
];