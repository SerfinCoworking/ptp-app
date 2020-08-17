import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PermissionsModule } from '@permissions/permissions.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule, routingComponents } from './dashboard-routing.module';
// components without routes
import { HeaderComponent } from '@dashboard/components/layouts/header/header.component';
import { SidebarComponent } from '@dashboard/components/layouts/sidebar/sidebar.component';
import { FooterComponent } from '@dashboard/components/layouts/footer/footer.component';
import { EmployeeListComponent } from '@dashboard/components/employee/employee-list/employee-list.component';
import { EmployeeShowComponent } from './components/employee/employee-show/employee-show.component';
import { UserListComponent } from '@dashboard/components/user/user-list/user-list.component';
import { UserShowComponent } from './components/user/user-show/user-show.component';
import { ConfirmComponent } from './components/shared/dialogs/confirm/confirm.component';

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




import { ObjectiveListComponent } from '@dashboard/components/objective/objective-list/objective-list.component';
import { ObjectiveShowComponent } from '@dashboard/components/objective/objective-show/objective-show.component';
import { ScheduleListComponent } from '@dashboard/components/schedule/schedule-list/schedule-list.component';
import { CalendarComponent } from '@dashboard/components/shared/calendar/calendar.component';
import { DayComponent } from '@dashboard/components/shared/calendar/day/day.component';
import { DateFormatPipe } from '@root/app/pipes/date-format.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DateFormatPipe,
    routingComponents,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    EmployeeListComponent,
    EmployeeShowComponent,
    UserListComponent,
    UserShowComponent,
    ObjectiveListComponent,
    ObjectiveShowComponent,
    ConfirmComponent,
    ScheduleListComponent,
    CalendarComponent,
    DayComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    PermissionsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
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
    FontAwesomeModule,
    MatSelectModule
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl
  }],
  entryComponents: [ConfirmComponent]
})
export class DashboardModule { }
