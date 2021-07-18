import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICalendarList } from '@shared/models/schedule';
import { expandCalendar } from "@shared/animations/calendar.animations";
import { ScheduleService } from '@shared/services/schedule.service';
import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.sass'],
  animations:[
    expandCalendar
  ]
})
export class ScheduleListComponent implements OnInit {

  @Output() showObjectiveEvent = new EventEmitter();

  isLoading: boolean = false;
  faSpinner = faSpinner;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  calendarList: ICalendarList;
  _activeCalendar: number = -1;
  _activeCalendarEvent: number = -1;
  _showCalendar: boolean = false;

  schedulePage: number;
  disablePrevSchedule: boolean;
  disableNextSchedule: boolean;
  loadingLeft: boolean = false;
  loadingRight: boolean = false;



  constructor(
    private activetedRoute: ActivatedRoute,
    private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.activetedRoute.data.subscribe( data => {
      this.calendarList = data.calendarList;
      this.schedulePage = this.calendarList.page;
      this.disablePrevSchedule = !(this.calendarList.page > 1);
      this.disableNextSchedule = !(this.calendarList.page < this.calendarList.pages);
    });
  }



  deletePeriod(e): void{
    this.scheduleService.deletePeriod(e).subscribe((success) => {
      if(success){
        this.scheduleService.getSchedules().subscribe((schedules) => {
          this.calendarList = schedules;
        });
      }
    });
  }

  triggerEventCollapse(target: number): void{
    if(this._showCalendar){
      this._activeCalendarEvent = this._activeCalendarEvent === target ? -1 : target;
    }
  }

  previousSchedule(){
    const page: number = (this.calendarList.page * 1) - 1;
    if(page >= 1){
      this.loadingLeft = true;
      this.schedulePage = page;
      this.getSchedules("", "", this.schedulePage);
    }
  }
  nextSchedule(){
    const page: number = (this.calendarList.page * 1) + 1;
    if(page <= this.calendarList.pages){
      this.loadingRight = true;
      this.schedulePage = page;
      this.getSchedules("", "", this.schedulePage);
    }
  }
  
  getSchedules(search?: string, sort?: string, schedulePage?: number, periodPage?: number, objectiveId?: string){
    this.scheduleService.getSchedules("", "", schedulePage, periodPage, objectiveId).subscribe((schedules) => {
      this.calendarList = schedules;
      this.disablePrevSchedule = !(this.calendarList.page > 1);
      this.disableNextSchedule = !(this.calendarList.page < this.calendarList.pages);
      this.loadingLeft = false;
      this.loadingRight = false;
    });
  }

}



