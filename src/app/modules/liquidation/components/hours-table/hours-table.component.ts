import { Component, Input, OnInit } from '@angular/core';
import { IHoursByWeek } from '@shared/models/liquidation';
import * as moment from 'moment';

@Component({
  selector: 'app-hours-table',
  templateUrl: './hours-table.component.html',
  styleUrls: ['./hours-table.component.sass']
})
export class HoursTableComponent implements OnInit {

  @Input() weeks: Array<IHoursByWeek>;
  dataTable: any;

  constructor() { }

  ngOnInit(): void {
    // moment.locale('es');
    this.dataTable = this.buildWeeks(this.weeks);
  }

  private buildWeeks(weeks: Array<IHoursByWeek>): any{
    let rows: any = [];
    let count = 0;
    weeks.map((week, ei) => {
      const dateCounter = moment(week.from);
      let totalHsDiurByWeek: number = 0;
      let totalHsNoctByWeek: number = 0;
      const toDate = moment(week.to);
      let row = [];
      while(dateCounter.isSameOrBefore(toDate)){
        
        let firstEventIn: string = "X";
        let firstEventOut: string = "X";
        let secondEventIn: string = "X";
        let secondEventOut: string = "X";
        let dayHours: number = 0;
        let nightHours: number = 0;
        let totalHsByDay: number = 0;
        let objectiveName: string = '-';
        let viaticosByDay: number = 0;

        // Map de eventos por semana
        week.events.map((item) => {
          // const fromDate = moment(item.event.fromDatetime);
          if(dateCounter.isSame(item.event.fromDatetime, 'date')){
            // feriadoHsByDay = feriadoHsByDay === '-' ? item.feriadoHours : (feriadoHsByDay + item.feriadoHours);
            // totalHsFeriadoByWeek += item.feriadoHours;
            
            if(firstEventIn === 'X'){
              firstEventIn =  moment(item.event.fromDatetime).format("HH:mm");
              firstEventOut =  moment(item.event.toDatetime).format("HH:mm");
              dayHours = item.dayHours;
              nightHours = item.nightHours;

              totalHsByDay += (item.dayHours + item.nightHours);
              totalHsDiurByWeek += item.dayHours;
              totalHsNoctByWeek += item.nightHours;
              objectiveName = item.objectiveName;
              // if(typeof(item.event.fromDatetime) !== 'undefined') viaticosByDay++;
            }else{
              secondEventIn = moment(item.event.fromDatetime).format("HH:mm");
              secondEventOut = moment(item.event.toDatetime).format("HH:mm");
              dayHours += item.dayHours;
              nightHours += item.nightHours;

              totalHsDiurByWeek += item.dayHours;
              totalHsNoctByWeek += item.nightHours;
              totalHsByDay += (item.dayHours + item.nightHours);
              objectiveName = item.objectiveName === objectiveName ? objectiveName : `${objectiveName} / ${item.objectiveName}`;
              // if(typeof(item.event.fromDatetime) !== 'undefined') viaticosByDay++;
            }
          }
        }); // fin map de eventos por dia de semana

        row.push({
          day: this.capitalize(dateCounter.format('ddd DD/MM/YYYY')),
          firstEventIn,
          firstEventOut,
          secondEventIn,
          secondEventOut,
          dayHours,
          nightHours,
          totalHsByDay,
          totalNightHours: 0,
          totalExtra: 0,
          totalHours: 0,
          objectiveName
        });       
        dateCounter.add(1, 'day');
      };

      count++;
      rows.push({days: row, 
        weekNumber: count, 
        totalHsDiurByWeek,
        totalHsNoctByWeek,
        totalExtraHours: week.totalExtraHours,
        totalHours: week.totalHours
      });
    });
    return rows;
  }

  private capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
