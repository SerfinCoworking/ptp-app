import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@permissions/permissions.module';
import { FormsModule } from '@angular/forms';

import { PeriodRoutingModule, routingComponents } from './period-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { DayDialogComponent } from './components/day-dialog/day-dialog.component';
import { ManualSignedFormComponent } from './components/manual-signed-form/manual-signed-form.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ routingComponents, DayDialogComponent, ManualSignedFormComponent ],
  imports: [
    CommonModule,
    PermissionsModule,
    PeriodRoutingModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    SharedModule,
    NgbModule
  ],
})
export class PeriodModule { }
