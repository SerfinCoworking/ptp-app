import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from '@shared/pipes/first-letter.pipe';
import { DateMomentPipe } from '@shared/pipes/date-moment.pipe';
import { LeadingZeroPipe } from './pipes/leading-zero.pipe';
import { CardFooterButtonsComponent } from './components/card-footer-buttons/card-footer-buttons.component';

import { RouterModule } from "@angular/router";
import { PermissionsModule } from '@permissions/permissions.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';





@NgModule({
  declarations: [
    DateMomentPipe,
    FirstLetterPipe,
    LeadingZeroPipe,
    CardFooterButtonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PermissionsModule,
    FontAwesomeModule
  ],
  exports: [DateMomentPipe, FirstLetterPipe, LeadingZeroPipe, CardFooterButtonsComponent]
})
export class SharedModule { }
