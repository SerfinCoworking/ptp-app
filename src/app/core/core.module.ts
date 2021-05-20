import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './http/loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { NavigationService } from './http/navigation/navigation.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    NavigationService,
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	],
})
export class CoreModule { }
