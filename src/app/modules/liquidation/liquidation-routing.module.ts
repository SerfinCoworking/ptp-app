import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ListComponent } from '@module/liquidation/pages/list/list.component';
import { FormComponent } from '@module/liquidation/pages/form/form.component';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { StaffListComponent } from '@module/liquidation/pages/staff-list/staff-list.component';
import { EmployeeDetailComponent } from '@module/liquidation/pages/employee-detail/employee-detail.component';
import { EmployeeDetailResolverService, LiquidationCreateResolverService, LiquidationDetailResolverService, LiquidationsResolverService } from '@shared/services/liquidation-resolver.service';
import { AllEmployeesResolverService } from '@shared/services/employee-resolver.service';

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
        resolve: { employees: AllEmployeesResolverService},
        data: {
          can: ['liquidation', 'create']
        }
      }, {
        path: ':id/empleado/:employee_id',
        component: EmployeeDetailComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { employeeLiquidated: EmployeeDetailResolverService},
        data: {
          can: ['liquidation', 'employeeDetail']
        }
      }, {
        path: ':id',
        component: StaffListComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { liquidation: LiquidationDetailResolverService},
        data: {
          can: ['liquidation', 'read']
        }
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