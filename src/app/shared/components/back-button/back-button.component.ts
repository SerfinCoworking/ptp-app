import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@core/http/navigation/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.sass']
})
export class BackButtonComponent {

  constructor(private navigationService: NavigationService) { }

  back(): void{
    this.navigationService.back();
  }
}
