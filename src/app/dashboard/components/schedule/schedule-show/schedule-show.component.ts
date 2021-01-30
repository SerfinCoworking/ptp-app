import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICalendarBuilder } from '@interfaces/schedule';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { interval, timer } from 'rxjs';


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
  private scheduleId: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private router: Router) {
      
      this.scheduleId = this.activatedRoute.snapshot.params.id;
    }

  ngOnInit(): void {
    // creamos un timer para realizar las peticiones cada 5 segundos
    const fetchCalendar = timer(0, 5000);
    fetchCalendar.subscribe((x) => {
      const calendarStream = this.scheduleService.getSchedulePeriods(this.scheduleId).subscribe((res) => {
        this.calendar = res.docs[0];
        this.scheduleService.setCalendarEvents(res.docs[0].period, res.docs[0].days);
        calendarStream.unsubscribe();//vamos eliminando la subscripcion creada
      });
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
      // actualizar el periodo observable
      this.calendar = res.docs[0];
      this.scheduleService.setCalendarEvents(res.docs[0].period, res.docs[0].days);
    });
  }

  saveSigns(e){
    this.scheduleService.saveSigneds(e).subscribe((res) => {
      // actualizar el periodo observable
      this.scheduleService.getSchedulePeriods(this.scheduleId).subscribe((res) => {
        this.calendar = res.docs[0];
        this.scheduleService.setCalendarEvents(res.docs[0].period, res.docs[0].days);
      });
    });
  }

  closeShow(){
    this.router.navigate(['/dashboard/agendas']);
  }
}



