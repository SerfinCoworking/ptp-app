import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObjective } from '@shared/models/objective';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent implements OnInit {

  objective: IObjective;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      if(data.objective){
        this.objective = data.objective;
      }
    });
  }

}
