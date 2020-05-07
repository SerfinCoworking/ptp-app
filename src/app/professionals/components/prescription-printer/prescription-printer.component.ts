import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Canvas, Line, Img, Table, Columns } from 'pdfmake-wrapper';
import * as pdfFontsX from 'pdfmake-unicode/dist/pdfmake-unicode.js';
import { DatePipe } from '@angular/common';
import { Prescriptions } from '@interfaces/prescriptions';

@Component({
  selector: 'app-prescription-printer',
  templateUrl: './prescription-printer.component.html',
  styleUrls: ['./prescription-printer.component.sass']
})
export class PrescriptionPrinterComponent implements OnInit {

  constructor(
    private datePipe: DatePipe
  ){}

  ngOnInit(): void {
  }

  // Print a prescription as PDF
  async print(prescription: Prescriptions){
    const pdf: PdfMakeWrapper = new PdfMakeWrapper();
    pdf.info({
      title: "Receta digital "+prescription.professionalFullname,
      author: 'RecetAR'
    });
    // Header
    pdf.add(await new Img('assets/img/LogoPdf.jpg').fit([60, 60]).build());
    pdf.add(new Txt('RECETA DIGITAL').bold().alignment('center').end);
    pdf.add(pdf.ln(2));
    pdf.add(new Txt(""+this.datePipe.transform(prescription.date, 'dd/MM/yyyy')).alignment('right').end);
    // Professional
    pdf.add(new Columns([ new Txt("Profesional").bold().end, new Txt("Matrícula").bold().end ]).end);
    pdf.add(new Columns([ new Txt(""+prescription.professionalFullname).end, new Txt(""+prescription.user.enrollment).end ]).end);
    pdf.add(pdf.ln(2));
    // Patient
    pdf.add(new Columns([ new Txt("Paciente").bold().end, new Txt("DNI").bold().end ]).end);
    pdf.add(new Columns([ new Txt(""+prescription.patient.lastName.toUpperCase()+", "+prescription.patient.firstName.toUpperCase()).end, new Txt(""+prescription.patient.dni) .end ]).end);
    pdf.add(new Canvas([ new Line(10, [500, 10]).end ]).end);
    // Supplies
    pdf.add(pdf.ln(1));
    prescription.supplies.forEach(supply => {
      pdf.add(new Txt(""+supply.supply.name+", cantidad: "+supply.quantity).end); // Marca error pero funciona bien
      pdf.add(pdf.ln(1));
    });
    pdf.add(new Canvas([ new Line(10, [500, 10]).end]).end);
    pdf.add(pdf.ln(1));
    pdf.add(new Txt("Observaciones").bold().end);
    pdf.add(new Txt(""+prescription.observation).end);
    pdf.add(pdf.ln(2));

    pdf.footer(new Txt("Esta receta se registró en recetar.andes.gob.ar").italics().alignment('center').end);

    pdf.create().open();
  }

}