import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from "@core/http/loader/loader.service";
import { finalize } from "rxjs/operators";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	constructor(public loaderService: LoaderService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		if (request.headers.get('Silent') === 'yes') {
			const newHeaders = request.headers.delete('Anonymous')
			const newRequest = request.clone({ headers: newHeaders });
			return next.handle(newRequest);
		}else{
			this.loaderService.show();
			return next.handle(request).pipe(finalize(() => this.loaderService.hide()));
		}
	}
}
