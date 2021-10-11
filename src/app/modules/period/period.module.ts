import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@permissions/permissions.module';

import { PeriodRoutingModule, routingComponents } from './period-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [ routingComponents ],
  imports: [
    CommonModule,
    PermissionsModule,
    PeriodRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FontAwesomeModule,
    SharedModule
  ],
})
export class PeriodModule { }
