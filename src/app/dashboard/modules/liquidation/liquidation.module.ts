import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiquidationRoutingModule, routingComponents } from './liquidation-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StaffLiquidationComponent } from './components/staff-liquidation/staff-liquidation.component';

@NgModule({
  declarations: [
    routingComponents,
    StaffLiquidationComponent
  ],
  imports: [
    CommonModule,
    LiquidationRoutingModule,
    MatButtonModule,
    MatCardModule,
    NgbModule
  ]
})
export class LiquidationModule { }
