import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementRoutingModule, routingComponents } from './movement-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PermissionsModule } from '@permissions/permissions.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    PermissionsModule,
    MovementRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FontAwesomeModule
  ]
})
export class MovementModule { }
