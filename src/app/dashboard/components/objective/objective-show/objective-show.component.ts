import { Component, OnInit } from '@angular/core';
import { ObjectiveService } from '@dashboard/services/objective.service';
import { IObjective } from '@interfaces/objective';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-objective-show',
  templateUrl: './objective-show.component.html',
  styleUrls: ['./objective-show.component.sass']
})
export class ObjectiveShowComponent implements OnInit {

  objective: IObjective;
  private subscription: Subscription = new Subscription;

  constructor(private objectiveService: ObjectiveService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.objectiveService.objective.subscribe(
        objective => {
          this.objective = objective;
        }
      )
    );
  }

  closeShow(): void{
    this.objectiveService.hideObjective();
  }

}
