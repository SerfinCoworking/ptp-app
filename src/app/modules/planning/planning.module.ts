import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@permissions/permissions.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';

import { PlanningRoutingModule , routingComponents} from './planning-routing.module';

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

import { WeekComponent } from '../planning/components/week/week.component';
import { DayComponent } from '../planning/components/day/day.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EventDialogComponent } from './components/event-dialog/event-dialog.component';
import { ScheduleSelectComponent } from './components/schedule-select/schedule-select.component';

@NgModule({
  declarations: [
    routingComponents,
    WeekComponent,
    DayComponent,
    EmployeeListComponent,
    EventDialogComponent,
    ScheduleSelectComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    PermissionsModule,
    FontAwesomeModule,
    SharedModule,
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
    MatListModule
  ]
})
export class PlanningModule { }
