import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEmployee } from '@interfaces/employee';

@Component({
  selector: 'app-third-step-form',
  templateUrl: './third-step-form.component.html',
  styleUrls: ['./third-step-form.component.sass']
})
export class ThirdStepFormComponent implements OnInit {
  @Output() selectionChangeEvent = new EventEmitter();
  @Input() employeeList: IEmployee[] | null;
  constructor() { }

  ngOnInit(): void {
  }

  selectionChangeHandler(e){
    this.selectionChangeEvent.emit(e);
  }

}
