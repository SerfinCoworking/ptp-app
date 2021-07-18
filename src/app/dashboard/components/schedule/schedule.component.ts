import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObjectiveService } from '@shared/services/objective.service';
import { panelOne, panelTwo } from '@shared/animations/wrapper-content';
import { IObjective } from '@shared/models/objective';
@Component({
  selector: 'schedule-submenu',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass'],
  animations: [
    panelOne,
    panelTwo
  ]
})
export class ScheduleComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  isVisibleShow: boolean = false;
  objective: IObjective | null = null;

  constructor(private objectiveService: ObjectiveService) { }

  ngOnInit(): void { }

  showObjective(objectiveId: string){
    this.subscription.add(
      this.objectiveService.getObjective(objectiveId).subscribe(
        (objective: IObjective) => {
          this.objective = objective;
          this.isVisibleShow = true;
        }
      )
    );
  }

  hideObjective(){
    this.objective = null;
    this.isVisibleShow = false;
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
