import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {


  xAxis: string = '0';
  xAxisPage: number = 0;
  planning: any;
  weeksHeader: any;
  defaultSchedules: Array<any>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.data.subscribe( data => {
      this.planning = data.planning.weeksEvents;
      this.defaultSchedules = data.planning.defaultSchedules;
      this.weeksHeader = data.planning.weeks;
    });
  }

  prevWeek(){
    if(this.xAxisPage > 0){
      this.xAxisPage--
      this.xAxis = (this.xAxisPage * -100) + '%';
    }
  }

  nextWeek(){
    if(this.xAxisPage < (this.weeksHeader.length - 1)){
      this.xAxisPage++
      this.xAxis = (this.xAxisPage * -100) + '%';
    }
  }

}
