import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderService } from '@core/http/loader/loader.service';
import { NavigationService } from '@core/http/navigation/navigation.service';
import { Subject } from 'rxjs';
import { faPen } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-card-footer-buttons',
  templateUrl: './card-footer-buttons.component.html',
  styleUrls: ['./card-footer-buttons.component.sass']
})
export class CardFooterButtonsComponent {
  
  @Input() editLink: RouterLink | undefined;
  @Input() modelName: string | undefined;
  isLoading$: Subject<boolean>;
  faPen = faPen;
  
  constructor(private loaderService: LoaderService, private navitationService: NavigationService) {
		this.isLoading$ = this.loaderService.isLoading;
	}

  back(): void {
    this.navitationService.back();
  }
}
