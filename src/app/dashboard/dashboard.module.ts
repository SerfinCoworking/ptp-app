import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule, routingComponents } from './dashboard-routing.module';
// components without routes
import { SidebarComponent } from '@dashboard/components/layouts/sidebar/sidebar.component';

// material modules
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    routingComponents,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DashboardRoutingModule,
    MatIconModule
  ]
})
export class DashboardModule { }
