import { Component, Input, ViewChildren, QueryList, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, ComponentFactoryResolver } from '@angular/core';
import { DayInlineComponent } from '@dashboard/components/shared/calendar-inline/day-inline/day-inline.component';
import { IEvent, IChangesEvent } from '@interfaces/schedule';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IEmployee } from '@interfaces/employee';
import { TimeSelectionComponent } from '../../dialogs/time-selection/time-selection.component';
import INews from '@interfaces/news';
import { environment } from '@root/environments/environment';


@Component({
  selector: 'app-week-inline',
  templateUrl: './week-inline.component.html',
  styleUrls: ['./week-inline.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WeekInlineComponent implements OnChanges {

  @ViewChildren(DayInlineComponent)
  days: QueryList<DayInlineComponent>

  @Output() updateShiftEventsEvent: EventEmitter<IChangesEvent> = new EventEmitter();
  @Input() week: Array<string>;
  @Input() shiftEvents: IEvent[];
  @Input() shiftOtherEvents: IEvent[];
  @Input() shiftEmployee: IEmployee;
  @Input() news: INews[];
  otherEventsIndexes: number[] = [];
  newsIndexes: number[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnChanges(change: SimpleChanges): void {
    if(change.shiftEvents?.currentValue){
      this.cleanEvents();
      this.setEvents(change.shiftEvents.currentValue);
    }
    if(change.shiftOtherEvents?.currentValue){
      this.cleanOtherEvents();
      this.setOtherEvents(change.shiftOtherEvents.currentValue);
    }
    
    if(change.news?.currentValue){
      this.cleanNews();
      this.setNews(change.news.currentValue);
    }
  }


  setEvents(events: IEvent[]){
    setTimeout(() => {

      const indexes: number[] = [];

      events.map((event: IEvent) => {
        const eventFromDate = moment(event.fromDatetime);
        const eventToDate = moment(event.toDatetime);
        const indexOfDateFrom: number = this.week.indexOf(eventFromDate.format("YYYY-MM-DD"));
        const indexOfDateTo: number = this.week.indexOf(eventToDate.format("YYYY-MM-DD"));

        if(indexOfDateFrom >= 0 && indexOfDateTo >= 0 && (indexOfDateFrom === indexOfDateTo)){
          const dayComponent = this.days.toArray()[indexOfDateFrom];
          dayComponent.displayEvents(eventFromDate.format("YYYY-MM-DD HH:mm"), eventToDate.format("YYYY-MM-DD HH:mm"));
          indexes.push(indexOfDateFrom);
        }
        else {
          if(indexOfDateFrom >= 0){
            const dayComponent = this.days.toArray()[indexOfDateFrom];
            dayComponent.displayEvents(eventFromDate.format("YYYY-MM-DD HH:mm"), null);
            indexes.push(indexOfDateFrom);
          }
            if(indexOfDateTo >= 0){
            const dayComponent = this.days.toArray()[indexOfDateTo];
            dayComponent.displayEvents(null, eventToDate.format("YYYY-MM-DD HH:mm"));
            indexes.push(indexOfDateTo);
          }
        }
      });
      

    });
  }
  
  setOtherEvents(otherEvents: IEvent[]){
    setTimeout(() => {

      this.otherEventsIndexes = [];
      
      // Pintamos los eventos que no son de este periodo, de la misma forma salvo que estos no deben ser modificados
      // este attributos es dinamico, ya que varia segun el periodo y el objetivo en el que estemos parados
      // si podemos agregar otro evento (teniendo en cuenta el maximo de eventos por dia "2")
      // hay que validar que no se super pongan los horarios, esto implica un cambio en el dialog que se levanta
      otherEvents.map((event: IEvent) => {
        const eventFromDate = moment(event.fromDatetime);
        const eventToDate = moment(event.toDatetime);
        const indexOfDateFrom: number = this.week.indexOf(eventFromDate.format("YYYY-MM-DD"));
        const indexOfDateTo: number = this.week.indexOf(eventToDate.format("YYYY-MM-DD"));

        if(indexOfDateFrom >= 0 && indexOfDateTo >= 0 && (indexOfDateFrom === indexOfDateTo)){
          const dayComponent = this.days.toArray()[indexOfDateFrom];
          dayComponent.displayOtherEvents(eventFromDate.format("YYYY-MM-DD HH:mm"), eventToDate.format("YYYY-MM-DD HH:mm"));
          this.otherEventsIndexes.push(indexOfDateFrom);
        }
        else {
          if(indexOfDateFrom >= 0){
            const dayComponent = this.days.toArray()[indexOfDateFrom];
            dayComponent.displayOtherEvents(eventFromDate.format("YYYY-MM-DD HH:mm"), null);
            this.otherEventsIndexes.push(indexOfDateFrom);
          }
            if(indexOfDateTo >= 0){
            const dayComponent = this.days.toArray()[indexOfDateTo];
            dayComponent.displayOtherEvents(null, eventToDate.format("YYYY-MM-DD HH:mm"));
            this.otherEventsIndexes.push(indexOfDateTo);
          }
        }
      });

    });
  }
  
  // Pintamos las novedades
  setNews(newsArr: INews[]){
    setTimeout(() => {
      this.newsIndexes = [];      
      this.week.map((day: string, index) => {
        newsArr.map((news: INews) => {
          const weekDay = moment(day);
          const isForTarget: boolean = news.employee ? news.employee._id == this.shiftEmployee._id : true;
          const newsInRange: Array<string> = [
            environment.CONCEPT_SUSPENSION,
            environment.CONCEPT_FERIADO,
            environment.CONCEPT_VACACIONES,
            environment.CONCEPT_LIC_JUSTIFICADA,
            environment.CONCEPT_LIC_NO_JUSTIFICADA,
            environment.CONCEPT_ART,
            environment.CONCEPT_LIC_SIN_SUELDO
          ];
          
          if (newsInRange.includes(news.concept.key) && weekDay.isBetween(news.dateFrom, news.dateTo, undefined, '[]') && isForTarget){
            const dayComponent = this.days.toArray()[index];
            dayComponent.displayNews(news);
            this.newsIndexes.push(index);
          }else if(news.concept.key === environment.CONCEPT_BAJA && weekDay.isSameOrAfter(news.dateFrom, 'date')  && isForTarget){
            const dayComponent = this.days.toArray()[index];
            dayComponent.displayNews(news);
            this.newsIndexes.push(index);
          }
        });
      });
    });
  }

  addShift(dayIndex: number, day: string){
    if(typeof dayIndex === 'undefined'){ return; }
    if(this.otherEventsIndexes.includes(dayIndex)){ return; }

    const dialogConfig = new MatDialogConfig();
    const eventDates: IEvent[] = this.shiftEvents.filter( (event: IEvent ) => {
      return moment(event.fromDatetime).isSame(day, 'day') || moment(event.toDatetime).isSame(day, 'day')
    });

    dialogConfig.data = { employee: this.shiftEmployee, cdate: day, eventDates: eventDates};

    this.dialog.open(TimeSelectionComponent, dialogConfig)
    .afterClosed()
    .subscribe((result: IEvent[])  => {
      if (result) {
        const eventPackage: IChangesEvent = { newEvents: result, oldEvents: eventDates };
        this.updateShiftEventsEvent.emit(eventPackage);
      }
    });
  }

  cleanEvents(){
    setTimeout(() => {
      this.week.map((day: string, index: number) => {
        const dayComponent = this.days.toArray()[index];
        dayComponent.cleanEvents();
      });
    });
  }

  cleanOtherEvents(){
    setTimeout(() => {
      this.week.map((day: string, index: number) => {
        const dayComponent = this.days.toArray()[index];
        dayComponent.cleanOtherEvents();
      });
    });
  }

  cleanNews(){
    setTimeout(() => {
      this.week.map((day: string, index: number) => {
        const dayComponent = this.days.toArray()[index];
        dayComponent.cleanNews();
      });
    });
  }

}
