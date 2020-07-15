import { Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { IObjective } from '@interfaces/objective';

@Component({
  selector: 'app-objective-show',
  templateUrl: './objective-show.component.html',
  styleUrls: ['./objective-show.component.sass']
})
export class ObjectiveShowComponent implements OnChanges, OnInit{
  @Output() hideObjectiveEvent = new EventEmitter();
  @Input('objective') objectiveInp: IObjective;
  objective: IObjective | null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes.objectiveInp){
      this.objective = changes.objectiveInp.currentValue;
    }
  }

  ngOnInit(): void {
  }

  closeShow(): void{
    this.hideObjectiveEvent.emit();
  }

}
