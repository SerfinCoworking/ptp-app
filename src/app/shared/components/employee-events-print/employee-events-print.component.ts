import { Component, Input } from '@angular/core';
import { IDefaultSchedule, IObjective } from '@shared/models/objective';
import { IPeriodByEmployeeByWeek, IPeriodDay, IPeriodWeekGroupByEmployee } from '@shared/models/period';
import { IPeriod } from '@shared/models/schedule';
import { PeriodService } from '@shared/services/period.service';
import moment from 'moment';
import { PdfMakeWrapper, Txt, Table, Cell } from 'pdfmake-wrapper';

@Component({
  selector: 'app-employee-events-print',
  templateUrl: './employee-events-print.component.html',
  styleUrls: ['./employee-events-print.component.sass']
})
export class EmployeeEventsPrintComponent {

  @Input() periodId: string;
  @Input() btnClass: string = '';
  private pdf: PdfMakeWrapper;
  period: IPeriod;
  objective: IObjective;

  constructor(private periodService: PeriodService){}

  // Print a calendar as PDF
  print() {
    this.pdf = new PdfMakeWrapper();
    this.pdf.pageOrientation('portrait');
    this.pdf.pageSize('A4');
    this.pdf.pageMargins([ 10, 10, 10, 10 ]);
    
    this.pdf.defaultStyle({
      fontSize: 6
    });
    
    this.periodService.periodPrinter(this.periodId).subscribe( (data) => {
      this.period = data.period;
      this.objective = data.objective;
      this.pdf.info({
        title: `${this.period.objective.name}_${moment(this.period.fromDate).format("DD_MM_YYYY")}_${moment(this.period.toDate).format("DD_MM_YYYY")}`,
      });
      this.pdfBuilder(data.weeksEvents, this.objective.defaultSchedules);
    });
  }
  
  private pdfBuilder(weeksEvents: IPeriodWeekGroupByEmployee[], schedules: IDefaultSchedule[]){
    const periodFrom: string =  moment(this.period.fromDate).format("DD/MM/yyyy");
    const periodTo: string =  moment(this.period.toDate).format("DD/MM/yyyy");
    const headerPage = new Txt(`${this.capitalize(this.period.objective.name)}:  ${periodFrom} - ${periodTo} `).fontSize(12).alignment('center').bold().margin([0, 0, 0, 10]).end;
    
    this.pdf.add(headerPage);
    weeksEvents.map( (weeks: IPeriodWeekGroupByEmployee, index) => {
      const content: Array<Array<any>> = this.getContent(weeks);
      const header = this.getHeader(weeks, `SEMANA ${index + 1}`);
      const widths = this.getWidths(weeks);
      
      const table = new Table([
        header,
        ...content
      ]).widths(
        widths
      ).end;
      
      this.pdf.add(table);
      this.pdf.add(" ");
      this.pdf.add(" ");
    });
    
    const col = [];
    schedules.map( (schedule: IDefaultSchedule, index) => {
      col.push([
        new Cell( new Txt(schedule.name).bold().alignment('center').end ).fillColor(`#${schedule.color.hex}`).end,
        new Cell( new Txt(`${schedule.name} = ${schedule.fromTime.hour.toString().padStart(2, '0')}:${schedule.fromTime.minute.toString().padStart(2, '0')}hs - ${schedule.toTime.hour.toString().padStart(2, '0')}:${schedule.toTime.minute.toString().padStart(2, '0')}hs`).bold().alignment('left').end ).end
      ]);
    });
    const table = new Table([
      ...col
    ]).end;
    this.pdf.add(table);
    this.pdf.add(" ");
    this.pdf.create().open();
  }    

  private getContent(weeks: IPeriodWeekGroupByEmployee){
    let rows = [];
    weeks.employeesWeek.map((week: IPeriodByEmployeeByWeek) => {
      
      let row = [];
      row.push(
        new Cell( new Txt(`${week.employee.lastName} ${week.employee.firstName}`).bold().end ).end
      );
      week.week.map((weekDay: IPeriodDay, ei) => {

        if(weekDay.events.length == 1){
          // One event
          row.push(
            new Cell( new Txt(weekDay.events[0].name).bold().alignment('center').end ).colSpan(2).fillColor(`#${weekDay.events[0].color.hex }`).end,
            {}
          );
        }else if(weekDay.events.length == 2){
          // Two events
          row.push(
            new Cell( new Txt(weekDay.events[0].name).bold().alignment('center').end ).fillColor(`#${weekDay.events[0]?.color.hex }`).end,
            new Cell( new Txt(weekDay.events[1].name).bold().alignment('center').end ).fillColor(`#${weekDay.events[1].color.hex}`).end
          );
        }else{
          // None events
          row.push(new Cell( new Txt(" ").end ).colSpan(2).end, {});
        }
      });
      rows.push(row);
    });
      
    return rows;
  }

  private getHeader(weeks: IPeriodWeekGroupByEmployee, title: string){

    const header = [];
    const headerColor: string = "#c3c3c3";
    header.push(new Cell( new Txt(title).bold().alignment('center').end ).fillColor(headerColor).end); // first col empty
    // get dates from the first employee
    weeks.employeesWeek[0].week.map((weekDay) => {
      header.push(
        new Cell( new Txt(this.capitalize(moment(weekDay.date).format("DD/MM"))).bold().alignment('center').end ).colSpan(2).fillColor(headerColor).end,
        {}
      );
    });

    return header;
  }
  private getWidths(weeks: IPeriodWeekGroupByEmployee): Array<string | number>{
    // Calc total width, include last week with less days
    const widths: Array<string | number> = [ 120 ];
    const week: IPeriodByEmployeeByWeek = weeks.employeesWeek[0];
    week.week.map((day) => {
      widths.push(16.5);
      widths.push(16.5);
    });
    return widths;
  }

  private capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
