import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementRoutingModule } from './movement-routing.module';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    MovementRoutingModule
  ]
})
export class MovementModule { }
