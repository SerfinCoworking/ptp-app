import { Component, Input } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.sass']
})
export class WeekComponent {


  @Input() week: Array<any>;
  

  constructor(private dialog: MatDialog) {}


  addEvent(day:string):void{
    
    // if(typeof dayIndex === 'undefined'){ return; }
    
    // const dayComponent = this.days.toArray()[dayIndex];
    // const dayNews: INews | null = dayComponent.getNews();
    
    // if(dayNews && [environment.CONCEPT_BAJA, environment.CONCEPT_LIC_SIN_SUELDO, environment.CONCEPT_VACACIONES].includes(dayNews.concept.key)){ return; }

    const dialogConfig = new MatDialogConfig();
    // const eventDates: IEvent[] = this.allEvents.filter( (event: IEvent ) => {
    //   return moment(event.fromDatetime).isSame(day, 'day') || moment(event.toDatetime).isSame(day, 'day')
    // });

    dialogConfig.data = { day: day};

    this.dialog.open(EventDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe((result: boolean)  => {
      console.log(result);
    });
    console.log(day);
  }
}
