import { Component, Input, OnInit } from '@angular/core';
import { IHoursByWeek } from '@interfaces/liquidation';
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
    moment.locale('es');
    this.dataTable = this.buildWeeks(this.weeks);
  }

  private buildWeeks(weeks: Array<IHoursByWeek>): any{
    let rows: any = [];
    // let totalHsDiur: number = 0;
    // let totalHsNoct: number = 0;
    // let totalHs: number = 0;
    // let totalHsExtra: number = 0;
    // let totalHsFeriado: number = 0;
    // let totalCapHs: number = 0;
    // let totalArtHs: number = 0;
    // let totalViaticos: number = 0;
    let count = 0;
    weeks.map((week, ei) => {
      const dateCounter = moment(week.from, "ddd MMM D YYYY");
      let totalHsDiurByWeek: number = 0;
      let totalHsNoctByWeek: number = 0;
      const toDate = moment(week.to, "ddd MMM D YYYY");
      // let totalHsFeriadoByWeek: number = 0;
      // let totalCapHsByWeek: number = 0;
      // let totalArtHsByWeek: number = 0;
      // let totalViaticosByWeek: number = 0;
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
        // let feriadoHsByDay: number | string = "-";
        // let capacitacionesHsByDay: number | string = "-";
        // let artHsByDay: number | string = "-";
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
              // if(typeof(item.event.checkin) !== 'undefined') viaticosByDay++;
            }else{
              secondEventIn = moment(item.event.fromDatetime).format("HH:mm");
              secondEventOut = moment(item.event.toDatetime).format("HH:mm");
              dayHours += item.dayHours;
              nightHours += item.nightHours;

              totalHsDiurByWeek += item.dayHours;
              totalHsNoctByWeek += item.nightHours;
              totalHsByDay += (item.dayHours + item.nightHours);
              objectiveName = item.objectiveName === objectiveName ? objectiveName : `${objectiveName} / ${item.objectiveName}`;
              // if(typeof(item.event.checkin) !== 'undefined') viaticosByDay++;
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

        // totalViaticosByWeek += viaticosByDay;

        // Calculo de horas por inicio de capacitacion
        // data.capacitaciones.map((cap: INews) => {
        //   if(dateCounter.isSame(cap.dateFrom, 'date')){
        //     capacitacionesHsByDay = cap.capacitationHours;
        //     totalCapHsByWeek += cap.capacitationHours;
        //   }
        // });
        
        // Calculo de horas por inicio de ART
        // data.arts.map((art: INews) => {
        //   if(dateCounter.isSame(art.dateFrom, 'date')){
        //     artHsByDay = art.worked_hours;
        //     totalArtHsByWeek += art.worked_hours;
        //     // console.log(totalArtHsByWeek);
        //   }
        // });

        
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
