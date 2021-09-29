import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IShiftEmployee } from '@shared/models/schedule';

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

  // Recalculate employee total hours
  updateTotalHs(employee: IShiftEmployee): void {
    const index = this.planning.findIndex((plan) => plan.employee._id == employee._id);
    let totalHs: number = 0;
    this.planning[index].weeks.map((week) => {
      totalHs += week.totalByWeekHs;
    });
    this.planning[index].totalHs = totalHs;
    console.log("debug", index);
  }
}
