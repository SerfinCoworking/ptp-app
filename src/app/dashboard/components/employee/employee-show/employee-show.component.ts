import { Component, OnInit, SimpleChanges, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { IEmployee } from '@interfaces/employee';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-show',
  templateUrl: './employee-show.component.html',
  styleUrls: ['./employee-show.component.sass']
})
export class EmployeeShowComponent implements OnChanges, OnInit {
  @Output() hideEmployeeEvent = new EventEmitter();
  @Input('employee') employeeInp: IEmployee;
  employee: IEmployee | null;
  faUserCircle = faUserCircle;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes.employeeInp){
      this.employee = changes.employeeInp.currentValue;
    }
  }

  ngOnInit(): void {
  }

  closeShow(): void{
    this.hideEmployeeEvent.emit();
  }

}
