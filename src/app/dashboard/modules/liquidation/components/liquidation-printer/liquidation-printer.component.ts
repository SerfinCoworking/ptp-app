import { Component, Input, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, Cell } from 'pdfmake-wrapper';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

import * as pdfFontsX from 'pdfmake-unicode/dist/pdfmake-unicode.js';
import { ScheduleService } from '@dashboard/services/schedule.service';
import moment from 'moment';
import INews from '@interfaces/news';
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFontsX);

@Component({
  selector: 'app-liquidation-printer',
  templateUrl: './liquidation-printer.component.html',
  styleUrls: ['./liquidation-printer.component.sass']
})

export class LiquidationPrinterComponent implements OnInit {
 
  // @Input() period: IPeriod;
  @Input() data: any;
  @Input() fromDate: moment.Moment;
  @Input() toDate: moment.Moment;
  private pdf: PdfMakeWrapper;
  faFilePdf = faFilePdf;

  constructor(private scheduleService: ScheduleService){}

  ngOnInit(){
    moment.locale("es");
  }
  // Print a calendar as PDF
  print() {
    this.pdf = new PdfMakeWrapper();
    this.pdf.pageOrientation('landscape');
    this.pdf.pageSize('A4');
    this.pdf.pageMargins([ 10, 10, 10, 10 ]);
    
    this.pdf.defaultStyle({
      fontSize: 6
    });
    this.pdfBuilder(this.data, this.fromDate, this.toDate);
  }
  
  private pdfBuilder(data, fromDate: moment.Moment, toDate: moment.Moment){
    const periodFrom: string =  fromDate.format("DD/MM/yyyy");
    const periodTo: string =  toDate.format("DD/MM/yyyy");
    const headerPage = new Txt(`${this.capitalize(this.data.employee.lastName)} ${this.capitalize(this.data.employee.firstName)}:  ${periodFrom} - ${periodTo} `).fontSize(12).alignment('left').bold().margin([0, 0, 0, 10]).end;
    
    this.pdf.add(headerPage);

    
    // data.map( (days, index) => {
      const content = this.getContent(this.data);
      const header = this.getHeader();
      const widths = this.getWidths();
    
      const table = new Table([
        ...header,
        ...content
      ]).widths(widths).end

      this.pdf.add(table);
      this.pdf.add("  ");
    // });
    
    this.pdf.create().open();
  }
    

  private getContent(data){
    let rows = [];
    console.log(data);
    const dayColor: string = "#c9daf8"
    data.total_hours_work_by_week.map((week, ei) => {
      const dateCounter = moment(week.from);
      let totalHsDiurByWeek: number = 0;
      let totalHsNoctByWeek: number = 0;
      let totalHsFeriadoByWeek: number = 0;
      let totalCapHsByWeek: number = 0;
      let totalArtHsByWeek: number = 0;
      let totalViaticosByWeek: number = 0;
      while(dateCounter.isSameOrBefore(week.to)){
        let count = 0;
        let row = [];

        const eventOdd: string = count % 2 === 0 ? "#cccccc" : "#EEEEEE";
        
  
        row.push(new Cell( new Txt(this.capitalize(dateCounter.format('ddd DD/MM/YYYY'))).bold().alignment('center').end ).fillColor(dayColor).end);

        let hsOneFrom: string = "X";
        let hsOneTo: string = "X";
        let hsTwoFrom: string = "X";
        let hsTwoTo: string = "X";
        let dayHours: number | string = "-";
        let nightHours: number | string = "-";
        let totalHsByDay: number = 0;
        let objectiveName: string = '-';
        let feriadoHsByDay: number | string = "-";
        let capacitacionesHsByDay: number | string = "-";
        let artHsByDay: number | string = "-";
        let viaticosByDay: number = 0;
        week.events.map((item) => {
          // const fromDate = moment(item.event.fromDatetime);
          if(dateCounter.isSame(item.event.fromDatetime, 'date')){
            feriadoHsByDay = feriadoHsByDay === '-' ? item.feriadoHours : (feriadoHsByDay + item.feriadoHours);
            totalHsFeriadoByWeek += item.feriadoHours;
            if(hsOneFrom === 'X'){
              hsOneFrom =  moment(item.event.fromDatetime).format("HH:mm");
              hsOneTo =  moment(item.event.toDatetime).format("HH:mm");
              dayHours = item.dayHours;
              nightHours = item.nightHours;
              totalHsByDay += (item.dayHours + item.nightHours);
              totalHsDiurByWeek += item.dayHours;
              totalHsNoctByWeek += item.nightHours;
              objectiveName = item.objectiveName;
              if(typeof(item.event.checkin) !== 'undefined') viaticosByDay++;
            }else{
              hsTwoFrom = moment(item.event.fromDatetime).format("HH:mm");
              hsTwoTo = moment(item.event.toDatetime).format("HH:mm");
              dayHours += item.dayHours;
              nightHours += item.nightHours;
              totalHsDiurByWeek += item.dayHours;
              totalHsNoctByWeek += item.nightHours;
              totalHsByDay += (item.dayHours + item.nightHours);
              objectiveName = item.objectiveName === objectiveName ? objectiveName : `${objectiveName} / ${item.objectiveName}`;
              if(typeof(item.event.checkin) !== 'undefined') viaticosByDay++;
            }
          }
        });
        totalViaticosByWeek += viaticosByDay;

        // Calculo de horas por inicio de capacitacion
        data.capacitaciones.map((cap: INews) => {
          if(dateCounter.isSame(cap.dateFrom, 'date')){
            capacitacionesHsByDay = cap.capacitationHours;
            totalCapHsByWeek += cap.capacitationHours;
          }
        });
        
        // Calculo de horas por inicio de ART
        data.arts.map((art: INews) => {
          if(dateCounter.isSame(art.dateFrom, 'date')){
            artHsByDay = art.worked_hours;
            totalArtHsByWeek += art.worked_hours;
            console.log(totalArtHsByWeek);
          }
        });
        row.push(new Cell( new Txt(hsOneFrom).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(hsOneTo).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(hsTwoFrom).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(hsTwoTo).bold().alignment('center').end ).fillColor(eventOdd).end);

        row.push(new Cell( new Txt(dayHours).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(nightHours).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(totalHsByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt("-").bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(feriadoHsByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(capacitacionesHsByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(artHsByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(viaticosByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(objectiveName).bold().alignment('center').end ).fillColor(eventOdd).end);
        rows.push(row);
        dateCounter.add(1, 'day');
        count++;

      };
      
      const subTotalRow = [];
      const subTotalRowColor: string = "#d0e0e3";

      subTotalRow.push(new Cell( new Txt(this.capitalize(`Total semana ${ei + 1}`)).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt("").bold().alignment('center').end ).fillColor(subTotalRowColor).colSpan(4).end);
      subTotalRow.push({});
      subTotalRow.push({});
      subTotalRow.push({});
      subTotalRow.push(new Cell( new Txt(totalHsDiurByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt(totalHsNoctByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt(week.totalHours).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt(week.totalExtraHours).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt(totalHsFeriadoByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt(totalCapHsByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt(totalArtHsByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt(totalViaticosByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt("-").bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      rows.push(subTotalRow);

    });  

      
    return rows;
  }

  private getHeader(){
    const header = [];
    const subheader = [];
    const headerColor: string = "#c9daf8";

    header.push(new Cell( new Txt('Días').alignment('center').end ).rowSpan(2).end);
    header.push(new Cell( new Txt('Horario 1').bold().alignment('center').end ).colSpan(2).fillColor(headerColor).end);
    header.push({});
    
    header.push(new Cell( new Txt('Horario 2').bold().alignment('center').end ).colSpan(2).fillColor(headerColor).end);
    header.push({});
    
    header.push(new Cell( new Txt('Hs Diurnas').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Hs Nocturnas').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Hs Total').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Hs Extras').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Hs Feriados').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Hs Capac.').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Art').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Viáticos').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Objetivo').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);

    subheader.push({text: ''});
    subheader.push({text: 'Entrada', alignment: 'center'});
    subheader.push({text: 'Salida', alignment: 'center'});
    subheader.push({text: 'Entrada', alignment: 'center'});
    subheader.push({text: 'Salida', alignment: 'center'});
    subheader.push({text: ''});
    subheader.push({text: ''});
    subheader.push({text: ''});
    subheader.push({text: ''});
    subheader.push({text: ''});
    subheader.push({text: ''});
    subheader.push({text: ''});
    subheader.push({text: ''});
    subheader.push({text: ''});
    
    return [header, subheader];
  }
  private getWidths(){
    const widths = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'];

    return widths;
  }

  private capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
