import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPermissionGuard } from '@permissions/guards/can-permission.guard';
import { TemplateResolverService, TemplatesResolverService } from '@shared/services/templates-resolver.service';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';


const routes: Routes = [
  {
    path: '',
    children: [ 
      {
        path: '',
        component: ListComponent,
        canActivate: [ CanPermissionGuard ],
        resolve: { templates: TemplatesResolverService},
        data: {
          can: ['template', 'read']
        }
      },
      {
        path: 'crear',
        component: FormComponent,
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['template', 'create']
        }
      },{
        path: 'editar/:id',
        component: FormComponent,
        resolve: { template: TemplateResolverService},
        canActivate: [ CanPermissionGuard ],
        data: {
          can: ['template', 'update']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleTemplateRoutingModule { }

export const routingComponents = [
  ListComponent,
  FormComponent
];