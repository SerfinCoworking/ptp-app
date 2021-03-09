import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@permissions/permissions.module';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule, routingComponents } from './employee-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomMatPaginatorIntl } from '@dashboard/custom-translations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    routingComponents,
    HeaderMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PermissionsModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatButtonModule,
    EmployeeRoutingModule,
    NgbModule
  ],
  providers:[
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    }
  ]
})
export class EmployeeModule { }
