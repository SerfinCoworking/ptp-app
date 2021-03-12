import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from '@shared/pipes/first-letter.pipe';
import { DateMomentPipe } from '@shared/pipes/date-moment.pipe';



@NgModule({
  declarations: [
    DateMomentPipe,
    FirstLetterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [DateMomentPipe, FirstLetterPipe]
})
export class SharedModule { }
