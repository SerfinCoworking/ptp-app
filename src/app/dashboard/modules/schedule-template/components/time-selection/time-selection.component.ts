import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ITimeSelection } from '@interfaces/schedule';

@Component({
  selector: 'app-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.sass']
})
export class TimeSelectionComponent implements OnInit {

  @Input() title: string = 'Horario';
  @Input() fromDate: any = {hour: 0, minute: 0};
  @Input() toDate: any = {hour: 0, minute: 0};
  @Output() fromDateEvent: EventEmitter<any> = new EventEmitter();
  @Output() toDateEvent: EventEmitter<any> = new EventEmitter();

  spinners: boolean = false;
  event: ITimeSelection = {
    fromDate:{
      time: {
        hour: 0,
        minute: 0,
      }
    }, 
    toDate:{
      time: {
        hour: 0,
        minute: 0,
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.event.fromDate.time = this.fromDate;
    this.event.toDate.time = this.toDate;
  }

  fromDateChange(e){
    this.fromDateEvent.emit(e);
  }
  
  toDateChange(e){
    this.toDateEvent.emit(e);
  }
}
