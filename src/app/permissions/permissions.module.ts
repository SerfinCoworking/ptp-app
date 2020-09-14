import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanDirective } from './can.directive';
import { HasRoleDirective } from './has-role.directive';



@NgModule({
  declarations: [CanDirective, HasRoleDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CanDirective,
    HasRoleDirective
  ]
})
export class PermissionsModule { }
