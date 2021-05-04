import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleTemplateRoutingModule, routingComponents } from './schedule-template-routing.module';


@NgModule({
  declarations: [
    routingComponents
  ],
  imports: [
    CommonModule,
    ScheduleTemplateRoutingModule
  ]
})
export class ScheduleTemplateModule { }
