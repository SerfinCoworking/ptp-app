import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@permissions/permissions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule, routingComponents } from './dashboard-routing.module';
// components without routes
import { HeaderComponent } from '@dashboard/components/layouts/header/header.component';
import { SidebarComponent } from '@dashboard/components/layouts/sidebar/sidebar.component';
import { FooterComponent } from '@dashboard/components/layouts/footer/footer.component';
import { ConfirmComponent } from './components/shared/dialogs/confirm/confirm.component';
import { TimeSelectionComponent } from './components/shared/dialogs/time-selection/time-selection.component';
import { LoadRingComponent } from './components/shared/load-ring/load-ring.component';

// material modules
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomMatPaginatorIntl } from '@dashboard/custom-translations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ObjectiveListComponent } from '@dashboard/components/objective/objective-list/objective-list.component';
import { ObjectiveShowComponent } from '@dashboard/components/objective/objective-show/objective-show.component';
import { ScheduleListComponent } from '@dashboard/components/schedule/schedule-list/schedule-list.component';
import { CalendarComponent } from '@dashboard/components/shared/calendar/calendar.component';
import { DayComponent } from '@dashboard/components/shared/calendar/day/day.component';
import { DayEventComponent } from '@dashboard/components/shared/calendar/day-event/day-event.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecondStepFormComponent } from './components/schedule/second-step-form/second-step-form.component';
import { ThirdStepFormComponent } from './components/schedule/third-step-form/third-step-form.component';
import { FourthStepFormComponent } from './components/schedule/fourth-step-form/fourth-step-form.component';
import { CalendarInlineComponent } from './components/shared/calendar-inline/calendar-inline.component';
import { WeekInlineComponent } from './components/shared/calendar-inline/week-inline/week-inline.component';
import { DayInlineComponent } from '@dashboard/components/shared/calendar-inline/day-inline/day-inline.component';

import { EmployeeActionsComponent } from '@dashboard/components/schedule/fourth-step-form/employee-actions/employee-actions.component';
import { SchedulePrinterComponent } from '@dashboard/components/schedule/schedule-printer/schedule-printer.component';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { PeriodSelectionComponent } from './components/schedule/period-selection/period-selection.component';
import { PeriodSelectionDialogComponent } from './components/shared/dialogs/period-selection-dialog/period-selection-dialog.component';
import { OnlyNumberDirective } from '../directives/only-number.directive';
import { EventDialogComponent } from './components/shared/calendar/event-dialog/event-dialog.component';
import { ScheduleShowComponent } from './components/schedule/schedule-show/schedule-show.component';
import { SharedModule } from '@shared/shared.module';

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    routingComponents,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ObjectiveListComponent,
    ObjectiveShowComponent,
    ConfirmComponent,
    EventDialogComponent,
    TimeSelectionComponent,
    ScheduleListComponent,
    CalendarComponent,
    DayComponent,
    DayEventComponent,
    SecondStepFormComponent,
    ThirdStepFormComponent,
    FourthStepFormComponent,
    CalendarInlineComponent,
    WeekInlineComponent,
    DayInlineComponent,
    EmployeeActionsComponent,
    PeriodSelectionComponent,
    PeriodSelectionDialogComponent,
    SchedulePrinterComponent,
    OnlyNumberDirective,
    ScheduleShowComponent,
    LoadRingComponent
  ],
  imports: [
    PermissionsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    }
  ],
  entryComponents: [ConfirmComponent]
})
export class DashboardModule { }
