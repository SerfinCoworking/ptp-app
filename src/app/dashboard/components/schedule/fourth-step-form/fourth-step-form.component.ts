import { Component, OnInit, Input } from '@angular/core';
import { IEmployee } from '@interfaces/employee';

@Component({
  selector: 'app-fourth-step-form',
  templateUrl: './fourth-step-form.component.html',
  styleUrls: ['./fourth-step-form.component.sass']
})
export class FourthStepFormComponent implements OnInit {
  @Input() employees: IEmployee[];
  constructor() { }

  ngOnInit(): void {
  }

}
