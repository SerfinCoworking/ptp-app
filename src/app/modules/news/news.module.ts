import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@permissions/permissions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NewsRoutingModule, routingComponents } from './news-routing.module';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { EmployeeSelComponent } from './components/employee-sel/employee-sel.component';
import { SharedModule } from '@shared/shared.module';
import { FiltersComponent } from './components/filters/filters.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

registerLocaleData(localeEsAr, 'es-Ar');
@NgModule({
  declarations: [
    routingComponents,
    EmployeeSelComponent,
    FiltersComponent,
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    PermissionsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDatepickerModule,
    MatDialogModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-AR'}
  ],
})
export class NewsModule { }
