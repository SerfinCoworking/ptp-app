import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiquidationRoutingModule, routingComponents } from './liquidation-routing.module';

@NgModule({
  declarations: [
    routingComponents
  ],
  imports: [
    CommonModule,
    LiquidationRoutingModule
  ]
})
export class LiquidationModule { }
