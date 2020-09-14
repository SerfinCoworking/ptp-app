import { Component, OnInit } from '@angular/core';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  faIdCardAlt = faIdCardAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
