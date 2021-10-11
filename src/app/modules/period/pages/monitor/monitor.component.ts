import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPeriod } from '@shared/models/schedule';
import { PeriodService } from '@shared/services/period.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.sass']
})
export class MonitorComponent implements OnInit {

  period: IPeriod;
  weeks: Array<any>;
  constructor(private periodService: PeriodService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.period = data.period.period;
      this.weeks = data.period.weeksEvents;
      console.log(data);
    });
  }

}
