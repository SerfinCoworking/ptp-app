import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './http/loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { NavigationService } from './http/navigation/navigation.service';
import {
	NgbDateAdapter,
	NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import {
	CustomNgbDateAdapter,
	CustomNgbDateParserFormatter
} from "../configs/ngbdatepicker.adapter";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    NavigationService,
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: NgbDateAdapter, useClass: CustomNgbDateAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter }
	],
})
export class CoreModule { }
