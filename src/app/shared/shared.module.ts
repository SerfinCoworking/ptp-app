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

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';


import { AngularSvgIconModule } from 'angular-svg-icon';
import { EmployeeSelectionComponent } from './components/employee-selection/employee-selection.component';
import { DateSelectionComponent } from './components/date-selection/date-selection.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeEventsPrintComponent } from './components/employee-events-print/employee-events-print.component';
import { EmployeeIndicatorComponent } from './components/employee-indicator/employee-indicator.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

@NgModule({
  declarations: [
    DateMomentPipe,
    FirstLetterPipe,
    LeadingZeroPipe,
    CardFooterButtonsComponent,
    LoadingIndicatorComponent,
    EmployeeSelectionComponent,
    DateSelectionComponent,
    EmployeeEventsPrintComponent,
    EmployeeIndicatorComponent,
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PermissionsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    NgbModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [DateMomentPipe,
    FirstLetterPipe,
    LeadingZeroPipe,
    CardFooterButtonsComponent,
    LoadingIndicatorComponent,
    EmployeeSelectionComponent,
    EmployeeEventsPrintComponent,
    DateSelectionComponent,
    EmployeeIndicatorComponent,
    BackButtonComponent]
})
export class SharedModule { }
