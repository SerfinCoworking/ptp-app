import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// pipe
import { FirstLetterPipe } from '@shared/pipes/first-letter.pipe';
import { DateMomentPipe } from '@shared/pipes/date-moment.pipe';
import { LeadingZeroPipe } from './pipes/leading-zero.pipe';

import { CardFooterButtonsComponent } from './components/card-footer-buttons/card-footer-buttons.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';


import { RouterModule } from "@angular/router";
import { PermissionsModule } from '@permissions/permissions.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { EmployeeSelectionComponent } from './components/employee-selection/employee-selection.component';


@NgModule({
  declarations: [
    DateMomentPipe,
    FirstLetterPipe,
    LeadingZeroPipe,
    CardFooterButtonsComponent,
    LoadingIndicatorComponent,
    EmployeeSelectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PermissionsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [DateMomentPipe,
    FirstLetterPipe,
    LeadingZeroPipe,
    CardFooterButtonsComponent,
    LoadingIndicatorComponent,
    EmployeeSelectionComponent]
})
export class SharedModule { }
