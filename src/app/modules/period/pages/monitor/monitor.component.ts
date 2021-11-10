import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DayDialogComponent } from '@module/period/components/day-dialog/day-dialog.component';
import { IMonitorEmployee, IMonitorWeek, IMonitorWeekMonth } from '@shared/models/plannig';
import { IPeriod } from '@shared/models/schedule';
import { PeriodService } from '@shared/services/period.service';
import moment from 'moment';
import { faPrint, faCalendarAlt, faPen, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { findIndex } from 'rxjs/operators';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.sass']
})
export class MonitorComponent implements OnInit {

  period: IPeriod;
  weeks: IMonitorWeekMonth[];
  toDay: moment.Moment = moment();
  faPrint = faPrint;
  faCalendarAlt = faCalendarAlt;
  faPen = faPen;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  byMonth: boolean = false;
  activeRow: number = 0;

  constructor(private periodService: PeriodService, 
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.period = data.period.period;
      this.weeks = data.period.weeksEvents;
      const today = moment();
      const weekIndex: number = this.weeks.findIndex((weeks) => {
        return weeks.week.find((dayEvent) => today.isSame(dayEvent.day.date, 'date'));
      })
      this.activeRow = weekIndex >= 0 ? weekIndex : 0;
    });
  }

  openDayDialog(weekDay: IMonitorWeek): void{
    if (!weekDay.day.dayEvents.filter((dayEv: IMonitorEmployee) => dayEv.events.length).length) return;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { weekDay, periodId: this.period._id };

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

  getListWithEvents(dayEvents): Array<any>{
    return dayEvents.filter((dayEvent) => { return !!dayEvent.events.length});
  }

  toggleDisplay(): void{
    this.byMonth = !this.byMonth;
  }

  isActiveRow(index: number): boolean{
    return !this.byMonth && index === this.activeRow;
  }
  
  nextRow(): void{
    if(this.activeRow < (this.weeks.length - 1)) this.activeRow += 1;
  }

  prevRow(): void{
    if (this.activeRow > 0) this.activeRow -= 1;
  }

}
