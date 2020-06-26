import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObjectiveService } from '@dashboard/services/objective.service';
import { panelOne, panelTwo } from '@shared/animations/wrapper-content';
@Component({
  selector: 'objective-submenu',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.sass'],
  animations: [
    panelOne,
    panelTwo
  ]
})
export class ObjectiveComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  isVisibleShow: boolean;
  constructor(private objectiveService: ObjectiveService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.objectiveService.isVisibleObjective.subscribe( isVisible => this.isVisibleShow = isVisible)
    );
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
