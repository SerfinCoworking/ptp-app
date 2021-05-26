import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiquidationRoutingModule, routingComponents } from './liquidation-routing.module';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrinterComponent } from './components/printer/printer.component';
import { SharedModule } from '@shared/shared.module';
import { PermissionsModule } from '@permissions/permissions.module';
import { HoursTableComponent } from './components/hours-table/hours-table.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { NewsListComponent } from './components/news-list/news-list.component';


@NgModule({
  declarations: [
    routingComponents,
    PrinterComponent,
    HoursTableComponent,
    EmployeeCardComponent,
    NewsListComponent
  ],
  imports: [
    CommonModule,
    PermissionsModule,
    LiquidationRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatInputModule,
    NgbModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class LiquidationModule { }
