import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiquidationRoutingModule, routingComponents } from './liquidation-routing.module';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrinterComponent } from './components/printer/printer.component';
import { SharedModule } from '@shared/shared.module';
import { PermissionsModule } from '@permissions/permissions.module';
import { HoursTableComponent } from './components/hours-table/hours-table.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';

@NgModule({
  declarations: [
    routingComponents,
    PrinterComponent,
    HoursTableComponent,
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    PermissionsModule,
    LiquidationRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatButtonToggleModule,
    NgbModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class LiquidationModule { }
