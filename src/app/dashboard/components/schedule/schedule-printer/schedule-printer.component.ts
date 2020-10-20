import { Component, Input, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, Cell } from 'pdfmake-wrapper';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

import * as pdfFontsX from 'pdfmake-unicode/dist/pdfmake-unicode.js';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { IEvent, IPeriod, IShift } from '@interfaces/schedule';
import moment from 'moment';
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFontsX);

@Component({
  selector: 'app-schedule-printer',
  templateUrl: './schedule-printer.component.html',
  styleUrls: ['./schedule-printer.component.sass']
})

export class SchedulePrinterComponent implements OnInit {
 
  @Input() period: IPeriod;
  private pdf: PdfMakeWrapper;
  faPrint = faPrint;

  constructor(private scheduleService: ScheduleService){}

  ngOnInit(){
    this.pdf = new PdfMakeWrapper();
    this.pdf.pageOrientation('landscape');
    this.pdf.pageSize('A4');
    this.pdf.pageMargins([ 10, 10, 10, 10 ]);
    this.pdf.defaultStyle({
      fontSize: 6
    });

    moment.locale("es");
  }
  // Print a calendar as PDF
  print() {
    this.scheduleService.getPeriodToPrint(this.period._id).subscribe( (res) => {
      this.pdfBuilder(res);
    });
  }
  
  private pdfBuilder(data){
    const periodFrom: string =  moment(this.period.fromDate).format("DD/MM/yyyy");
    const periodTo: string =  moment(this.period.toDate).format("DD/MM/yyyy");
    const headerPage = new Txt(`${this.capitalize(this.period.objective.name)}:  ${periodFrom} - ${periodTo} `).fontSize(12).alignment('center').bold().margin([0, 0, 0, 10]).end;
    
    this.pdf.add(headerPage);

    
    data.map( (days, index) => {
      const content = this.getContent(this.period, index, days);
      const header = this.getHeader(days);
      const widths = this.getWidths(days);
      
      const table = new Table([
        ...header,
        ...content
      ]).widths(widths).end

      this.pdf.add(table);
      this.pdf.add("  ");
    });
    
    this.pdf.create().open();
  }
    

  private getContent(period: IPeriod, weekIndex: number, days: string[]){
    let rows = [];
      
    period.shifts.map((shift: IShift, ei) => {
      const eventOdd: string = ei % 2 === 0 ? "#cccccc" : "#EEEEEE";
      let row = [];
      const weekRow = new Cell( new Txt((weekIndex + 1).toString()).bold().alignment('center').end ).fillColor(eventOdd).end;  // week number
      const rowEmployee = new Cell( new Txt(`${shift.employee.lastName} ${shift.employee.firstName}`).bold().alignment('center').end ).fillColor(eventOdd).end; // employee
      row.push(rowEmployee, weekRow);

      days.map( (day, di) => {

        let dayRow = [];
        const events: IEvent[] = shift.events.filter((event: IEvent, index) => {
          const sameFromDate: boolean = moment(event.fromDatetime).isSame(day, 'day') && moment(event.fromDatetime).isSame(day, 'month') && moment(event.fromDatetime).isSame(day, 'year');
          const sametoDate: boolean = moment(event.toDatetime).isSame(day, 'day') && moment(event.toDatetime).isSame(day, 'month') && moment(event.toDatetime).isSame(day, 'year');
          return sameFromDate || sametoDate;
        });


          let firstIn: string = '';
          let firstOut: string = '';

          let secondIn: string = '';
          let secondOut: string = '';
          
          if(typeof(events[0]) !== 'undefined'){

            if(moment(events[0].fromDatetime).isSame(day, 'day')){
              firstIn = moment(events[0].fromDatetime).format("HH:mm");
            }
            if(moment(events[0].toDatetime).isSame(day, 'day')){
              firstOut = moment(events[0].toDatetime).format("HH:mm");
            }
          }

          if(typeof(events[1]) !== 'undefined'){
            if(moment(events[1].fromDatetime).isSame(day, 'day')){
              secondIn = moment(events[1].fromDatetime).format("HH:mm");
            }
            if(moment(events[1].toDatetime).isSame(day, 'day')){
              secondOut = moment(events[1].toDatetime).format("HH:mm");
            }
          }

          dayRow = [
            new Cell( new Txt(firstIn).bold().alignment('center').end ).fillColor(eventOdd).end,
            new Cell( new Txt(firstOut).bold().alignment('center').end ).fillColor(eventOdd).end,
            new Cell( new Txt(secondIn).bold().alignment('center').end ).fillColor(eventOdd).end,
            new Cell( new Txt(secondOut).bold().alignment('center').end ).fillColor(eventOdd).end
          ];

        row.push(...dayRow);

      });
      rows.push(row);
    });
      
    return rows;
  }

  private getHeader(days: string[]){
    const header = [];
    const subheader = [];
    const headerColor: string = "#999999";

    header.push(new Cell( new Txt('').alignment('center').end ).end);
    header.push({text: ''});

    subheader.push(new Cell( new Txt('Apellido y nombre').bold().alignment('center').end ).end);
    subheader.push({text: 'SEMANA', alignment: 'center'});
    
    days.map((day) => {
      header.push(new Cell( new Txt(this.capitalize(moment(day).format("dddd DD/MM"))).bold().alignment('center').end ).colSpan(4).fillColor(headerColor).end);
      header.push({}); //fix colspan tables
      header.push({}); //fix colspan tables
      header.push({}); //fix colspan tables
      
      subheader.push({text: 'desde', alignment: 'center'});
      subheader.push({text: 'hasta', alignment: 'center'});
      subheader.push({text: 'desde', alignment: 'center'});
      subheader.push({text: 'hasta', alignment: 'center'});
    
    });        
    return [header, subheader];
  }
  private getWidths(days: string[]){
    const widths = [60, 'auto'];

      days.map((day) => {
        [1, 2, 3, 4].map((day) => {
          widths.push(16.5);
        });
      });
    return widths;
  }

  private capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
