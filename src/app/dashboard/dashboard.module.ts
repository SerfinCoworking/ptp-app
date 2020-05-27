import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule, routingComponents } from './dashboard-routing.module';



@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule,
    BrowserModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
