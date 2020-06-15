import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PermissionsModule } from '@permissions/permissions.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule, routingComponents } from './dashboard-routing.module';
// components without routes
import { HeaderComponent } from '@dashboard/components/layouts/header/header.component';
import { SidebarComponent } from '@dashboard/components/layouts/sidebar/sidebar.component';
import { EmployeeListComponent } from '@dashboard/components/employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from '@dashboard/components/employee/employee-form/employee-form.component';

// material modules
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomMatPaginatorIntl } from '@dashboard/custom-translations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    routingComponents,
    HeaderComponent,
    SidebarComponent,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    PermissionsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl
  }]
})
export class DashboardModule { }
