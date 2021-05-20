import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

// app_initializer auth
import { AuthService } from '@auth/services/auth.service';
import { PermissionService } from '@permissions/services/permission.service';
import { servicesOnRun } from '@services/initializer.service';

// material
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// component
import { DatePipe } from '@angular/common';
import { NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { httpInterceptorProvider } from '@auth/httpInterceptorProvider';
import { DatepickerEsI18n, I18n } from '@signed/datepicker-es-i18n';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    httpInterceptorProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: servicesOnRun,
      multi: true,
      deps: [AuthService, PermissionService]
    },
    DatePipe,
    {provide: LOCALE_ID, useValue: 'es-AR'},
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    I18n, 
    {provide: NgbDatepickerI18n, useClass: DatepickerEsI18n}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
