import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiquidationRoutingModule, routingComponents } from './liquidation-routing.module';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    routingComponents
  ],
  imports: [
    CommonModule,
    LiquidationRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatButtonToggleModule,
    NgbModule
  ]
})
export class LiquidationModule { }
