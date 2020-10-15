import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Canvas, Line, Img, Columns } from 'pdfmake-wrapper';
import { DatePipe } from '@angular/common';
import { ICalendarList } from '@interfaces/schedule';

@Component({
  selector: 'app-schedule-printer',
  templateUrl: './schedule-printer.component.html',
  styleUrls: ['./schedule-printer.component.sass']
})
export class SchedulePrinterComponent implements OnInit {

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  // Print a calendar as PDF
  async print(calendar: ICalendarList) {
    const pdf: PdfMakeWrapper = new PdfMakeWrapper();
    pdf.info({
      title: 'Agenda ' + calendar.,
      author: 'RecetAR'
    });
    // Header
    pdf.add(await new Img('assets/img/LogoPdf.jpg').fit([60, 60]).build());
    pdf.add(new Txt('RECETA DIGITAL').bold().alignment('center').end);
    pdf.add(pdf.ln(2));
    pdf.add(new Txt('' + this.datePipe.transform(calendar.date, 'dd/MM/yyyy')).alignment('right').end);
    // Professional
    pdf.add(new Columns([ new Txt('Profesional').bold().end, new Txt('Matrícula').bold().end ]).end);
    pdf.add(new Columns([ new Txt('' + calendar.professional.businessName).end, new Txt('' + calendar.professional.enrollment).end ]).end);
    pdf.add(pdf.ln(2));
    // Patient
    pdf.add(new Columns([ new Txt('Paciente').bold().end, new Txt('DNI').bold().end ]).end);
    pdf.add(new Canvas([ new Line(10, [500, 10]).end ]).end);
    // Supplies
    pdf.add(pdf.ln(1));
    calendar.supplies.forEach(supply => {
      pdf.add(new Txt('' + supply.supply.name + ', cantidad: ' + supply.quantity).end); // Marca error pero funciona bien
      pdf.add(pdf.ln(1));
    });
    pdf.add(new Canvas([ new Line(10, [500, 10]).end]).end);
    if ( calendar.diagnostic ) {
      pdf.add(pdf.ln(1));
      pdf.add(new Txt('Diagnóstico').bold().end);
      pdf.add(new Txt('' + calendar.diagnostic ).end);
    }
    if (calendar.observation) {
      pdf.add(pdf.ln(1));
      pdf.add(new Txt('Observaciones').bold().end);
      pdf.add(new Txt('' + calendar.observation).end);
    }
    pdf.add(pdf.ln(2));

    pdf.footer(new Txt('Esta agenda se registró en http://ptp-app.herokuapp.com/').italics().alignment('center').end);

    pdf.create().open();
  }

}
