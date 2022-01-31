import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {

  copyrightYear = '';
  constructor() { 
    this.copyrightYear = moment().format("YYYY");
  }
}
