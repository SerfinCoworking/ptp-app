import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPeriod, IShift, IEvent } from '@interfaces/schedule';



@Component({
  selector: 'app-event-selection',
  templateUrl: './event-selection.component.html',
  styleUrls: ['./event-selection.component.sass']
})
export class EventSelectionComponent implements OnInit {

  @Output() shiftEvent = new EventEmitter;
  @Input() builder: Array<string[]>;
  @Input() xAxis: string;
  @Input() shift: IShift;
  constructor() {}

  ngOnInit(): void{
    console.log(this.shift);
  }

  addShift(e){
    this.shiftEvent.emit(e);
  }
}
