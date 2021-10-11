import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DayDialogComponent } from '@module/period/components/day-dialog/day-dialog.component';
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
  constructor(private periodService: PeriodService, 
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.period = data.period.period;
      this.weeks = data.period.weeksEvents;
      console.log(data);
    });
  }

  openDayDialog(weekDay: any): void{
    if (!weekDay.dayEvents.length) return;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { weekDay };

    this.dialog.open(DayDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe((confirm: boolean)  => {
      if(confirm){
        
        // this.periodService.deleteEmployee(this.periodId, this.employee._id).subscribe((res) => {
        //   console.log(res);
        //   this.deleteEmployeeEvent.emit();
        // });

      }
    });
  }

}