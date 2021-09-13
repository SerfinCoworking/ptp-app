import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICalendarBuilder } from '@shared/models/schedule';
import { ScheduleDepService } from '@shared/services/schedule-dep.service';
import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription, timer } from 'rxjs';


@Component({
  selector: 'app-schedule-show',
  templateUrl: './schedule-show.component.html',
  styleUrls: ['./schedule-show.component.sass']
})

export class ScheduleShowComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  faSpinner = faSpinner;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;  
  calendar: ICalendarBuilder;
  private scheduleId: string;
  private fetchCalendarSubscription: Subscription;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleDepService: ScheduleDepService,
    private router: Router) {
      
      this.scheduleId = this.activatedRoute.snapshot.params.id;
    }
    
  ngOnInit(): void {
    // creamos un timer para realizar las peticiones cada 5 segundos
    const fetchCalendar = timer(0, 5000);
    let firstTime: boolean = false;
    this.fetchCalendarSubscription = fetchCalendar.subscribe((x) => {
      const calendarStream = this.scheduleDepService.getSchedulePeriods(this.scheduleId, undefined, firstTime).subscribe((res) => {
        this.calendar = res.docs[0];
        this.scheduleDepService.setCalendarEvents(res.docs[0].period, res.docs[0].days);
        calendarStream.unsubscribe();//vamos eliminando la subscripcion creada
      });
      firstTime = true;
    });
  }
  
  ngOnDestroy(): void {
    this.fetchCalendarSubscription.unsubscribe();
  }

  deletePeriod(e): void{
    this.scheduleDepService.deletePeriod(e).subscribe((success) => {
      if(success){
        this.router.navigate(['/dashboard/agendas']);
      }
    });
  }
  
  previousPeriod(e){
    const periodPage: number = (e.page * 1) - 1;
    if(periodPage >= 1){
      this.getPeriod(periodPage);
    }
  }
  
  nextPeriod(e){
    const periodPage: number = (e.page * 1) + 1;
    if(periodPage <= e.pages){
      this.getPeriod(periodPage);
    }
  }
  
  getPeriod(periodPage?: number){
    this.fetchCalendarSubscription.unsubscribe();
    // creamos un timer para realizar las peticiones cada 5 segundos
    const fetchCalendar = timer(0, 5000);
    this.fetchCalendarSubscription = fetchCalendar.subscribe((x) => {
      const calendarStream = this.scheduleDepService.getSchedulePeriods(this.calendar.schedule._id, periodPage, true).subscribe((res) => {
        this.calendar = res.docs[0];
        this.scheduleDepService.setCalendarEvents(res.docs[0].period, res.docs[0].days);
        calendarStream.unsubscribe();//vamos eliminando la subscripcion creada
      });
    });
  }

  saveSigns(e){
    this.scheduleDepService.saveSigneds(e).subscribe((res) => {
      // actualizar el periodo observable
      this.scheduleDepService.getSchedulePeriods(this.scheduleId).subscribe((res) => {
        this.calendar = res.docs[0];
        this.scheduleDepService.setCalendarEvents(res.docs[0].period, res.docs[0].days);
      });
    });
  }

  closeShow(){
    this.router.navigate(['/dashboard/agendas']);
  }
}



