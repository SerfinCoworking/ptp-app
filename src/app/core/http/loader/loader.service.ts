import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class LoaderService {
	private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	show(): void {
		this.isLoading$.next(true);
	}
	hide(): void {
		this.isLoading$.next(false);
	}

	get isLoading(): Subject<boolean> {
		return this.isLoading$;
	}
}
