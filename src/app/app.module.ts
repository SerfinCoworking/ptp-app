import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

// app_initializer auth
import { AuthService } from '@auth/services/auth.service';
import { RolesService } from '@permissions/services/roles.service';
import { servicesOnRun } from '@services/initializer.service';

// material
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// component
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { httpInterceptorProvider } from '@auth/httpInterceptorProvider';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
      deps: [AuthService, RolesService]
    },
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
