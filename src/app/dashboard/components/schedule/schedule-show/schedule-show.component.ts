import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICalendarBuilder } from '@interfaces/schedule';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-schedule-show',
  templateUrl: './schedule-show.component.html',
  styleUrls: ['./schedule-show.component.sass']
})

export class ScheduleShowComponent implements OnInit {

  isLoading: boolean = false;
  faSpinner = faSpinner;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;  
  calendar: ICalendarBuilder;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private router: Router) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.scheduleService.getSchedulePeriods(id).subscribe((res) => {
      this.calendar = res.docs[0];
    });
  }


  deletePeriod(e): void{
    this.scheduleService.deletePeriod(e).subscribe((success) => {
      if(success){
        this.router.navigate(['/dashboard/agendas']);
      }
    });
  }
  
  previousPeriod(e){
    const periodPage: number = (e.page * 1) - 1;
    if(periodPage >= 1){
      this.getSchedules(periodPage);
    }
  }
  
  nextPeriod(e){
    const periodPage: number = (e.page * 1) + 1;
    if(periodPage <= e.pages){
      this.getSchedules(periodPage);
    }
  }
  
  getSchedules(periodPage?: number){
    this.scheduleService.getSchedulePeriods(this.calendar.schedule._id, periodPage).subscribe((res) => {
      this.calendar = res.docs[0];
      // console.log(this.calendar);
    });
  }

  saveSigns(e){
    this.scheduleService.saveSigneds(e).subscribe((res) => {
      // handle success save
    });
  }
}



