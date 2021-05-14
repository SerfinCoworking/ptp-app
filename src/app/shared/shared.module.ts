import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from '@shared/pipes/first-letter.pipe';
import { DateMomentPipe } from '@shared/pipes/date-moment.pipe';
import { LeadingZeroPipe } from './pipes/leading-zero.pipe';



@NgModule({
  declarations: [
    DateMomentPipe,
    FirstLetterPipe,
    LeadingZeroPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [DateMomentPipe, FirstLetterPipe, LeadingZeroPipe]
})
export class SharedModule { }
