import { Component, Input, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, Cell, Canvas, Line } from 'pdfmake-wrapper';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

import * as pdfFontsX from 'pdfmake-unicode/dist/pdfmake-unicode.js';
import { ScheduleService } from '@dashboard/services/schedule.service';
import moment from 'moment';
import INews from '@interfaces/news';
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFontsX);

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.sass']
})

export class PrinterComponent implements OnInit {
 
  // @Input() period: IPeriod;
  @Input() data: any;
  @Input() fromDate: moment.Moment;
  @Input() toDate: moment.Moment;
  private pdf: PdfMakeWrapper;
  faFilePdf = faFilePdf;

  constructor(private scheduleService: ScheduleService){

    moment.locale('es', {
      months : {
        format: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
        standalone: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
        isFormat: /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?|MMMM?(\[[^\[\]]*\]|\s+)+D[oD]?/
      },
      monthsShort : 'ene._feb._mar_abr._may_jun_jul._ago_sep._oct._nov._dic.'.split('_'),
      monthsParseExact : true,
      weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
      weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
      weekdaysMin : 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
      weekdaysParseExact : true,
      longDateFormat : {
          LT : 'HH:mm',
          LTS : 'HH:mm:ss',
          L : 'DD/MM/YYYY',
          LL : 'D MMMM YYYY',
          LLL : 'D MMMM YYYY HH:mm',
          LLLL : 'dddd D MMMM YYYY HH:mm'
      }
    });

  }

  ngOnInit(){
    
  }
  // Print a calendar as PDF
  print() {
    this.pdf = new PdfMakeWrapper();
    this.pdf.pageOrientation('portrait');
    this.pdf.pageSize('A4');
    this.pdf.pageMargins([ 20, 20, 20, 20 ]);
    
    this.pdf.defaultStyle({
      fontSize: 10
    });
    this.pdfBuilder(this.data, this.fromDate, this.toDate);
  }
  
  private pdfBuilder(data, fromDate: moment.Moment, toDate: moment.Moment){
    const periodFrom: string =  fromDate.format("DD/MM/YYYY");
    const periodTo: string =  toDate.format("DD/MM/YYYY");
    const title: string = `${this.capitalize(this.data.employee.lastName)} ${this.capitalize(this.data.employee.firstName)}: reporte de asistencia período ${periodFrom} a ${periodTo} `;
    const headerPage = new Txt(title).fontSize(12).alignment('left').bold().margin([0, 0, 0, 10]).end;
    
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
      
      const line = new Canvas([
        new Line([360, 45], [520, 45]).end
      ]).end;
      this.pdf.add(line);
      
      const footer: string = `${this.capitalize("Firma y Aclaración")}`;
      const footerPage = new Txt(footer).fontSize(12).alignment('right').bold().margin([60, 10, 60, 0]).end;
      this.pdf.add(footerPage);
      this.pdf.add("  ");
    // });
    
    this.pdf.create().open();
  }
    

  private getContent(data){
    let rows = [];
    let totalHsDiur: number = 0;
    let totalHsNoct: number = 0;
    let totalHs: number = 0;
    let totalHsExtra: number = 0;
    let totalHsFeriado: number = 0;
    let totalCapHs: number = 0;
    let totalArtHs: number = 0;
    let totalViaticos: number = 0;
    const dayColor: string = "#c9daf8";
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
            // console.log(totalArtHsByWeek);
          }
        });
        row.push(new Cell( new Txt(hsOneFrom).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(hsOneTo).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(hsTwoFrom).bold().alignment('center').end ).fillColor(eventOdd).end);
        row.push(new Cell( new Txt(hsTwoTo).bold().alignment('center').end ).fillColor(eventOdd).end);

        // row.push(new Cell( new Txt(dayHours).bold().alignment('center').end ).fillColor(eventOdd).end);
        // row.push(new Cell( new Txt(nightHours).bold().alignment('center').end ).fillColor(eventOdd).end);
        // row.push(new Cell( new Txt(totalHsByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        // row.push(new Cell( new Txt("-").bold().alignment('center').end ).fillColor(eventOdd).end);
        // row.push(new Cell( new Txt(feriadoHsByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        // row.push(new Cell( new Txt(capacitacionesHsByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        // row.push(new Cell( new Txt(artHsByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        // row.push(new Cell( new Txt(viaticosByDay.toString()).bold().alignment('center').end ).fillColor(eventOdd).end);
        // row.push(new Cell( new Txt(objectiveName).bold().alignment('center').end ).fillColor(eventOdd).end);
        rows.push(row);
        dateCounter.add(1, 'day');
        count++;

      };
      
      const subTotalRow = [];
      const subTotalRowColor: string = "#d0e0e3";

      subTotalRow.push(new Cell( new Txt(this.capitalize(`Semana ${ei + 1}`)).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      subTotalRow.push(new Cell( new Txt("").bold().alignment('center').end ).fillColor(subTotalRowColor).colSpan(4).end);
      subTotalRow.push({});
      subTotalRow.push({});
      subTotalRow.push({});
      // subTotalRow.push(new Cell( new Txt(totalHsDiurByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      // subTotalRow.push(new Cell( new Txt(totalHsNoctByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      // subTotalRow.push(new Cell( new Txt(week.totalHours).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      // subTotalRow.push(new Cell( new Txt(week.totalExtraHours).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      // subTotalRow.push(new Cell( new Txt(totalHsFeriadoByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      // subTotalRow.push(new Cell( new Txt(totalCapHsByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      // subTotalRow.push(new Cell( new Txt(totalArtHsByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      // subTotalRow.push(new Cell( new Txt(totalViaticosByWeek.toString()).bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      // subTotalRow.push(new Cell( new Txt("-").bold().alignment('center').end ).fillColor(subTotalRowColor).end);
      rows.push(subTotalRow);
      totalHsDiur += totalHsDiurByWeek;
      totalHsNoct += totalHsNoctByWeek;
      totalHs += week.totalHours;
      totalHsExtra += week.totalExtraHours;
      totalHsFeriado += totalHsFeriadoByWeek;
      totalCapHs += totalCapHsByWeek;
      totalArtHs += totalArtHsByWeek;
      totalViaticos += totalViaticosByWeek;

    });  

    // const totalRow = [];
    // const totalRowColor: string = "#d0e0e3";
    // totalRow.push(new Cell( new Txt(this.capitalize(`Total`)).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt("").bold().alignment('center').end ).fillColor(totalRowColor).colSpan(4).end);
    // totalRow.push({});
    // totalRow.push({});
    // totalRow.push({});
    // totalRow.push(new Cell( new Txt(totalHsDiur.toString()).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt(totalHsNoct.toString()).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt(totalHs.toString()).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt(totalHsExtra.toString()).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt(totalHsFeriado.toString()).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt(totalCapHs.toString()).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt(totalArtHs.toString()).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt(totalViaticos.toString()).bold().alignment('center').end ).fillColor(totalRowColor).end);
    // totalRow.push(new Cell( new Txt("-").bold().alignment('center').end ).fillColor(totalRowColor).end);
    // rows.push(totalRow);
    
    return rows;
  }

  private getHeader(){
    const header = [];
    const subheader = [];
    const headerColor: string = "#c9daf8";

    header.push(new Cell( new Txt('Días').alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    header.push(new Cell( new Txt('Horario 1').bold().alignment('center').end ).colSpan(2).fillColor(headerColor).end);
    header.push({});
    
    header.push(new Cell( new Txt('Horario 2').bold().alignment('center').end ).colSpan(2).fillColor(headerColor).end);
    header.push({});
    
    // header.push(new Cell( new Txt('Hs Diurnas').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    // header.push(new Cell( new Txt('Hs Nocturnas').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    // header.push(new Cell( new Txt('Hs Total').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    // header.push(new Cell( new Txt('Hs Extras').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    // header.push(new Cell( new Txt('Hs Feriados').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    // header.push(new Cell( new Txt('Hs Capac.').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    // header.push(new Cell( new Txt('Art').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    // header.push(new Cell( new Txt('Viáticos').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);
    // header.push(new Cell( new Txt('Objetivo').bold().alignment('center').end ).rowSpan(2).fillColor(headerColor).end);

    subheader.push({text: ''});
    subheader.push(new Cell( new Txt('Entrada').bold().alignment('center').end ).fillColor(headerColor).end);
    subheader.push(new Cell( new Txt('Salida').bold().alignment('center').end ).fillColor(headerColor).end);
    subheader.push(new Cell( new Txt('Entrada').bold().alignment('center').end ).fillColor(headerColor).end);
    subheader.push(new Cell( new Txt('Salida').bold().alignment('center').end ).fillColor(headerColor).end);
    // subheader.push({text: ''});
    // subheader.push({text: ''});
    // subheader.push({text: ''});
    // subheader.push({text: ''});
    // subheader.push({text: ''});
    // subheader.push({text: ''});
    // subheader.push({text: ''});
    // subheader.push({text: ''});
    // subheader.push({text: ''});
    
    return [header, subheader];
  }

  private getWidths(){
    const widths = [100, 'auto', 'auto', 'auto', 'auto'];

    return widths;
  }

  private capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
