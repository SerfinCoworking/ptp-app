import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportToXlsxService } from '@dashboard/services/export-to-xlsx.service';
import { LiquidationService } from '@dashboard/services/liquidation.service';
import ILiquidation, { ExcelJson } from '@interfaces/liquidation';
import { environment } from '@root/environments/environment';
import { faSpinner, faTimes, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

@Component({
  selector: 'app-staff-liquidation',
  templateUrl: './staff-liquidation.component.html',
  styleUrls: ['./staff-liquidation.component.sass']
})
export class StaffLiquidationComponent implements OnInit {


  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: ILiquidation[] = [];
  stickyHeaders: Array<string> = ['header-1', 'header-2'];
  stickyColumns: Array<string> = [];
  overCell;
  faTimes = faTimes;
  faFilePdf = faFilePdf;
  faSpinner = faSpinner;
  faFileExcel = faFileExcel;
  isLoading: boolean = false;
  fromDate: moment.Moment;
  toDate: moment.Moment;

  private headerHeight: number = 4.071;
  private rowHeight: number = 3.5;
  stickyRows: Array<string> = [];
  stickyRowsStyle = [
    {
      top: `${this.headerHeight}rem`,
      bottom: "0rem",
    },{
      top: `${this.headerHeight + this.rowHeight}rem`,
      bottom: "0rem",
    },{
      top: `${this.headerHeight + (this.rowHeight * 2)}rem`,
      bottom: "0rem",
    },{
      top: `${this.headerHeight + (this.rowHeight * 3)}rem`,
      bottom: "0rem",
    },{
      top: `${this.headerHeight + (this.rowHeight * 4)}rem`,
      bottom: "0rem",
    },{
      top: `${this.headerHeight + (this.rowHeight * 5)}rem`,
      bottom: "0rem",
    }
  ];

  constructor(private liquidationService: LiquidationService, 
    private activatedRoute: ActivatedRoute,
    private exportToXlsxService: ExportToXlsxService
    ) {
    this.displayedColumns[0]= 'legajo';
    this.displayedColumns[1]= 'funcion';
    this.displayedColumns[2]= 'objetivo';
    this.displayedColumns[3]= 'dotacion';
    this.displayedColumns[4]= 'hs_diurnas';
    this.displayedColumns[5]= 'hs_nocturnas';
    this.displayedColumns[6]= 'hs_total';
    this.displayedColumns[7]= 'hs_ex_total';
    this.displayedColumns[8]= 'viaticos';
    this.displayedColumns[9]= 'feriados';
    this.displayedColumns[10]= 'capacitacion';
    this.displayedColumns[11]= 'lic_jus';
    this.displayedColumns[12]= 'aus_no_jus';
    this.displayedColumns[13]= 'suspencion';
    this.displayedColumns[14]= 'adelantos';
    this.displayedColumns[15]= 'vacaciones';
    this.displayedColumns[16]= 'lic_sin_sueldo';
    this.displayedColumns[17]= 'art';
    this.displayedColumns[18]= 'plus_resp';
    this.displayedColumns[19]= 'presentismo';
    this.displayedColumns[20]= 'embargo';
    this.displayedColumns[21]= 'observacion';
    this.columnsToDisplay = this.displayedColumns.slice();
  }

  ngOnInit(): void {
    const { fromDate, toDate } = this.activatedRoute.snapshot.queryParams;
    
    this.fromDate = moment(fromDate, "DD_MM_YYYY").startOf('day');
    this.toDate = moment(toDate, "DD_MM_YYYY").endOf('day');

    this.liquidationService.getLiquidation(fromDate, toDate).subscribe((res) => {
      this.dataSource = res;
    });

  }

  /** Whether the button toggle group contains the id as an active value. */
  isSticky(buttonToggleGroup: Array<string>, id: string): boolean {
    return (buttonToggleGroup).indexOf(id) !== -1;
  }
  
  toggleSticky(buttonToggleGroup: Array<string>, id: string): void {
    const isSticky: boolean = this.isSticky(buttonToggleGroup, id);
    if(isSticky){
      buttonToggleGroup.splice(buttonToggleGroup.indexOf(id), 1);
    }else{
      buttonToggleGroup.push(id);
    }
  }
  
  toggleRowSticky(employeeId: string): void {  
    // si ya fue agregado lo quitamos
    if(this.stickyRows.length && this.stickyRows.indexOf(employeeId) > -1){
      this.stickyRows.splice(this.stickyRows.indexOf(employeeId), 1);
      // cada vez que se quita un elemento se recalcula la posicion bottom
      this.stickyRows.forEach((row, index) => {
        this.stickyRowsStyle[index].bottom = `${this.rowHeight * ((this.stickyRows.length - 1) - index)}rem`;
      });
    }else if(this.stickyRows.length < 6){
      // pérmitimos solo hasta 6 files
      if(this.stickyRows.length){
        // si hay elementos en el array, antes de agregar lo ordenamos segun el orden de las filas (index)
        const newElementIndex = this.dataSource.findIndex((element) =>{
          return element.employee._id === employeeId
        });
        const tmpStickyRows: Array<string> = [...this.stickyRows];
        this.stickyRows = [];
        let inserted: boolean = false;
        tmpStickyRows.forEach((liqRow, index) => {
          const oldElementIndex = this.dataSource.findIndex((element) =>{
            return element.employee._id === liqRow
          });
          if(newElementIndex < oldElementIndex && !inserted){
            this.stickyRows.push(employeeId);
            inserted = !inserted;
          }
          this.stickyRows.push(liqRow);
          
          if(newElementIndex > oldElementIndex && !inserted && (tmpStickyRows.length == index + 1)){
            this.stickyRows.push(employeeId);
            inserted = !inserted;
          }
          
        });
      }else{
        // si no tiene elementos debemos agregar el primero
        this.stickyRows.push(employeeId);
      }
      // recalcula la posicion bottom de cada elemento
      this.stickyRows.forEach((row, index) => {
        this.stickyRowsStyle[index].bottom = `${this.rowHeight * ((this.stickyRows.length - 1) - index)}rem`;
      });
    } 
  }

  toggleColumn(col: string) {
    const targetCol = this.columnsToDisplay.indexOf(col);
    const checkPresenceOfCol = this.displayedColumns.indexOf(col);
    if(checkPresenceOfCol < 0){
      // this.displayedColumns.push(this.columnsToDisplay[targetCol]);
      this.displayedColumns.splice(targetCol, 0, this.columnsToDisplay[targetCol]);
    }else{
      this.displayedColumns.splice(checkPresenceOfCol, 1);
    }

  }

  exportToExcel(): void {

    const edata: Array<ExcelJson> = [];
    const headerPeriod: ExcelJson = {
      data: [{
        A: 'Fecha del periodo',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
        H: '',
        I: '',
        J: '',
        K: '',
        L: '',
        M: '',
        N: '',
        O: '',
        P: '',
        Q: '',
        R: '',
        S: '',
        T: '',
      }],
      skipHeader: true
    };

    edata.push(headerPeriod);

    const udt: ExcelJson = {
      data: [
        { 
          A: 'Legajo', 
          B: 'DNI', 
          C: 'Dotación', 
          D: 'Diurnas (HS)', 
          E: 'Nocturnas (HS)', 
          F: 'Total horas (HS)', 
          G: 'Total extra (HS)', 
          H: 'Viáticos (DÍAS)', 
          I: 'Feriados (HS)', 
          J: 'Capacitación (HS)',
          K: 'ART (HS)',
          L: 'ART (Jornadas)',
          M: 'Total Lic. justificadas (HS)',
          N: 'Licencias justificadas',          
          O: '',      
          P: '',      
          Q: '',      
          R: '',      
          S: '',      
          T: '',      
          U: 'Licencias sin goce de sueldo (DIAS)',
          V: 'Licencias sin justificar',
        }, // table header
      ],
      skipHeader: true
    };
    udt.data.push(
      { 
        N: 'Fallecimiento'
      });

    let reasonsCol = "N";
    let reasonsHeader = {};
    environment.CONCEPT_LIC_JUS_REASONS.forEach((reason: any) => {
      reasonsHeader[reasonsCol] = reason.exportHeader;
      reasonsCol = String.fromCharCode(reasonsCol.charCodeAt(0) + 1);
    });
    
    udt.data.push(reasonsHeader);

    this.dataSource.forEach(liq => {
      const data = {
        A: liq.employee.enrollment,
        B: liq.employee.dni,
        C: `${liq.employee.lastName} ${liq.employee.firstName}`,
        D: liq.total_day_in_hours,
        E: liq.total_night_in_hours,
        F: liq.total_in_hours,
        G: liq.total_extra_in_hours,
        H: liq.total_viaticos,
        I: liq.total_feriado_in_hours,
        J: liq.total_capacitation_hours,
        K: liq.total_art_in_hours,
        L: liq.total_art_by_working_day.length,
        M: liq.total_lic_justificada_in_hours,

      };

      let reasonsCol = "N";
      liq.lic_justificada_group_by_reason.forEach((reason: any) => {
        data[reasonsCol] = reason.assigned_hours;
        reasonsCol = String.fromCharCode(reasonsCol.charCodeAt(0) + 1);
      });
      
      data["U"] = liq.total_lic_no_justificada_in_hours,
      data["V"] =  liq.total_lic_sin_sueldo_days,

      udt.data.push(data);
    });

    
    edata.push(udt);

    const cellMerge: any = {
      merges: [
        {s: {r: 2, c: 0}, e:{r: 4, c: 0}},
        {s: {r: 2, c: 1}, e:{r: 4, c: 1}},
        {s: {r: 2, c: 2}, e:{r: 4, c: 2}},
        {s: {r: 2, c: 3}, e:{r: 4, c: 3}},
        {s: {r: 2, c: 4}, e:{r: 4, c: 4}},
        {s: {r: 2, c: 5}, e:{r: 4, c: 5}},
        {s: {r: 2, c: 6}, e:{r: 4, c: 6}},
        {s: {r: 2, c: 7}, e:{r: 4, c: 7}},
        {s: {r: 2, c: 8}, e:{r: 4, c: 8}},
        {s: {r: 2, c: 9}, e:{r: 4, c: 9}},
        {s: {r: 2, c: 10}, e:{r: 4, c: 10}},
        {s: {r: 2, c: 11}, e:{r: 4, c: 11}},
        {s: {r: 2, c: 12}, e:{r: 4, c: 12}},
        {s: {r: 2, c: 13}, e:{r: 2, c: 19}},
        {s: {r: 3, c: 13}, e:{r: 3, c: 15}},
        {s: {r: 2, c: 20}, e:{r: 4, c: 20}},
        {s: {r: 2, c: 21}, e:{r: 4, c: 21}},
      ],
      colInfo: [
        {wch:8},
        {wch:10},
        {wch:60},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
        {wch:15},
      ]
    };
    this.exportToXlsxService.exportJsonToExcel(edata, 'liquidación', cellMerge);
  }
  
}