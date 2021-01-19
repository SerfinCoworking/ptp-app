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
import { LiquidationPrinterComponent } from './components/liquidation-printer/liquidation-printer.component';

@NgModule({
  declarations: [
    routingComponents,
    LiquidationPrinterComponent
  ],
  imports: [
    CommonModule,
    LiquidationRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatButtonToggleModule,
    NgbModule,
    FontAwesomeModule
  ]
})
export class LiquidationModule { }
