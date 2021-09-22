import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.sass']
})
export class PlanningComponent implements OnInit {

  xAxis: string = '0';
  xAxisPage: number = 0;
  planning: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.data.subscribe( data => {
      console.log(data, "<================");
      this.planning = data.planning;
    });
  }

  // prevWeek(){
  //   if(this.xAxisPage > 0){
  //     this.xAxisPage--
  //     this.xAxis = (this.xAxisPage * -100) + '%';
  //   }
  // }

  // nextWeek(){
  //   if(this.xAxisPage < (this.periodBuilder.length - 1)){
  //     this.xAxisPage++
  //     this.xAxis = (this.xAxisPage * -100) + '%';
  //   }
  // }

}
