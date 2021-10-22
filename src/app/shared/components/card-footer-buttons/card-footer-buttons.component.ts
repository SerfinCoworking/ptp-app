import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderService } from '@core/http/loader/loader.service';
import { Subject } from 'rxjs';
import { faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-card-footer-buttons',
  templateUrl: './card-footer-buttons.component.html',
  styleUrls: ['./card-footer-buttons.component.sass']
})
export class CardFooterButtonsComponent {
  
  @Input() editLink: RouterLink | undefined;
  @Input() saveBtn: boolean = false;
  @Input() modelName: string | undefined;
  @Input() saveBtnTitle: string = 'Guardar';
  @Output() submitEvent = new EventEmitter();
  isLoading$: Subject<boolean>;
  faPen = faPen;
  faSpinner = faSpinner;
  
  constructor(private loaderService: LoaderService) {
		this.isLoading$ = this.loaderService.isLoading;
	}
}
