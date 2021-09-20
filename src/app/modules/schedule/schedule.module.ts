import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@permissions/permissions.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ScheduleRoutingModule, routingComponents } from './schedule-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatListModule,
    PermissionsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
  ]
})
export class ScheduleModule { }
