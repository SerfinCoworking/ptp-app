import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@permissions/permissions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserRoutingModule , routingComponents} from './user-routing.module';
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
import { UserListComponent } from './user-list/user-list.component';
import { UserShowComponent } from './user-show/user-show.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';




@NgModule({
  declarations: [
    routingComponents,
    UserListComponent,
    UserShowComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PermissionsModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatIconModule,
    MatTooltipModule,
    FontAwesomeModule
  ]
})
export class UserModule { }
