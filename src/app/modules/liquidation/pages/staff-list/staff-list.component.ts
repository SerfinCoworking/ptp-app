import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportToXlsxService } from '@shared/services/export-to-xlsx.service';
import { LiquidationService } from '@shared/services/liquidation.service';
import { ExcelJson, ILiquidatedEmployee } from '@shared/models/liquidation';
import { environment } from '@root/environments/environment';
import { faSpinner, faTimes, faFileExcel, faUser, faPen, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.sass']
})
export class StaffListComponent implements OnInit {

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: ILiquidatedEmployee[] = [];
  employees: ILiquidatedEmployee[] = [];
  stickyHeaders: Array<string> = ['header-1', 'header-2'];
  stickyColumns: Array<string> = [];
  overCell;
  faTimes = faTimes;
  faFilePdf = faFilePdf;
  faSpinner = faSpinner;
  faFileExcel = faFileExcel;
  faUser = faUser;
  faPen = faPen;
  faLock = faLock;
  isLoading: boolean = false;
  fromDate: string;
  toDate: string;
  status: string;
  liquidationId: string;

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

  filterForm: FormGroup = this.fBuilder.group({
	  name: [""],
    legajo: [""]
	});

  constructor(private liquidationService: LiquidationService, 
    private activatedRoute: ActivatedRoute,
    private exportToXlsxService: ExportToXlsxService,
    private dialog: MatDialog,
    private fBuilder: FormBuilder) {
    // this.displayedColumns[0]= 'legajo';
    this.displayedColumns[0]= 'dotacion';
    this.displayedColumns[1]= 'funcion';
    this.displayedColumns[2]= 'hs_diurnas';
    this.displayedColumns[3]= 'hs_nocturnas';
    this.displayedColumns[4]= 'hs_total';
    this.displayedColumns[5]= 'hs_ex_total';
    this.displayedColumns[6]= 'viaticos';
    this.displayedColumns[7]= 'feriados';
    this.displayedColumns[8]= 'capacitacion';
    this.displayedColumns[9]= 'lic_jus';
    this.displayedColumns[10]= 'aus_no_jus';
    this.displayedColumns[11]= 'suspencion';
    this.displayedColumns[12]= 'adelantos';
    this.displayedColumns[13]= 'vacaciones';
    this.displayedColumns[14]= 'lic_sin_sueldo';
    this.displayedColumns[15]= 'art';
    this.displayedColumns[16]= 'plus_resp';
    this.displayedColumns[17]= 'presentismo';
    this.displayedColumns[18]= 'embargo';
    this.displayedColumns[19]= 'empleador';
    this.displayedColumns[20]= 'estado';
    this.displayedColumns[21]= 'scheduleHs';
    this.displayedColumns[22]= 'actions'
    // this.permissionService.hasPermission('liquidation', 'employeeDetail').then((permission: boolean) => {
    //   if(permission) 
    // })
    this.columnsToDisplay = this.displayedColumns.slice();
  }

  ngOnInit(): void {
    
    this.activatedRoute.data.subscribe( data => {
      moment.locale("es");
      this.fromDate = data.liquidation.dateFrom;
      this.toDate = data.liquidation.dateTo;
      this.status = data.liquidation.status;
      this.liquidationId = data.liquidation._id;
      this.dataSource = data.liquidation.liquidatedEmployees;
      this.employees = data.liquidation.liquidatedEmployees;
      this.liquidationService.setLiquidation(data.liquidation);
    });

    this.filterForm.valueChanges.subscribe((form) => {
      console.log(form);
      this.dataSource = this.employees.filter((emp) => {
        const target = new RegExp(form.name, 'ig');
        const legajo = new RegExp(form.legajo, 'ig');
        return (!!emp.employee.firstName.match(target) || !!emp.employee.lastName.match(target)) && !!emp.employee.enrollment.match(legajo);
      })
    })
    // console.log(this.dataSource);
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

  resetFilters(): void{
    this.filterForm.reset({
      name: "", legajo: ""
    });
  }

  closeLiquidation(): void{
  
    moment.locale('es');
    const dialogConfig = new MatDialogConfig();
    const month = moment(this.fromDate, "YYYY-MM-DD");
    dialogConfig.data = { item: `Desea cerrar la liquidación de ${month.format("MMMM")} ${month.format("YYYY")}?`, title: "Cerrar liquidación" };
    
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.liquidationService.close(this.liquidationId).subscribe(res => {
          this.status = res.liquidation.status;
        });
      }
    });
  }

  exportToExcel(): void {
    moment.locale("es");
    const fromDate = moment(this.fromDate).startOf('day');
    const toDate = moment(this.toDate).endOf('day');
    const edata: Array<ExcelJson> = [];
    const headerPeriod: ExcelJson = {
      data: [{
        A: `Período: ${fromDate.format("DD-MM-YYYY")} - ${toDate.format("DD-MM-YYYY")}`
      }],
      skipHeader: true
    };

    edata.push(headerPeriod);

    const udt: ExcelJson = {
      data: [
        { 
          A: 'Legajo', 
          B: 'DNI', 
          C: 'Empleador', 
          D: 'Dotación', 
          E: 'Diurnas (HS)', 
          F: 'Nocturnas (HS)', 
          G: 'Total horas (HS)', 
          H: 'Total extra (HS)', 
          I: 'Viáticos (DÍAS)', 
          J: 'Feriados (HS)', 
          K: 'Capacitación (HS)',
          L: 'ART (HS)',
          M: 'ART (Jornadas)',
          N: 'Total Lic. justificadas (HS)',
          O: 'Licencias justificadas',          
          P: '',      
          Q: '',      
          R: '',      
          S: '',      
          T: '',      
          U: '',      
          V: 'Licencias justificadas (Jornadas)',
          W: 'Licencias sin goce de sueldo (DIAS)',
          X: 'Licencias sin justificar',
          Y: 'Adelantos',
          Z: 'Plus por responsabilidad',
        }, // table header
      ],
      skipHeader: true
    };
    udt.data.push(
      { 
        O: 'Fallecimiento'
      });

    let reasonsCol = "O";
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
        C: liq.employee.employer,
        D: `${liq.employee.lastName} ${liq.employee.firstName}`,
        E: liq.total_by_hours.signed.by.day,
        F: liq.total_by_hours.signed.by.night,
        G: liq.total_by_hours.signed.total,
        H: liq.total_by_hours.signed.extras,
        I: liq.total_viaticos,
        J: liq.total_by_hours.news.feriado,
        K: liq.total_by_hours.news.capacitaciones,
        L: liq.total_by_hours.news.art,
        M: liq.hours_by_working_day.art.length,
        N: liq.total_by_hours.news.lic_justificada,

      };

      let reasonsCol = "O";
      liq.lic_justificada_group_by_reason.forEach((reason: any) => {
        data[reasonsCol] = reason.assigned_hours;
        reasonsCol = String.fromCharCode(reasonsCol.charCodeAt(0) + 1);
      });
      data["V"] = liq.hours_by_working_day.lic_justificadas,
      data["W"] = liq.total_by_hours.news.lic_no_justificada,
      data["X"] =  liq.total_of_news.lic_sin_sueldo_by_days,
      data["Y"] =  `$ ${liq.total_of_news.adelanto_import}`,
      data["Z"] =  `$ ${liq.total_of_news.plus_responsabilidad}`,

      udt.data.push(data);
    });

    
    edata.push(udt);

    const cellMerge: any = {
      merges: [
        {s: {r: 0, c: 0}, e:{r: 0, c: 3}},
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
        {s: {r: 2, c: 13}, e:{r: 4, c: 13}},
        {s: {r: 2, c: 14}, e:{r: 2, c: 20}},
        {s: {r: 3, c: 14}, e:{r: 3, c: 16}},
        // {s: {r: 2, c: 20}, e:{r: 4, c: 20}},
        {s: {r: 2, c: 21}, e:{r: 4, c: 21}},
        {s: {r: 2, c: 22}, e:{r: 4, c: 22}},
        {s: {r: 2, c: 23}, e:{r: 4, c: 23}},
        {s: {r: 2, c: 24}, e:{r: 4, c: 24}},
        {s: {r: 2, c: 25}, e:{r: 4, c: 25}},
      ],
      colInfo: [
        {wch:8},
        {wch:10},
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
        {wch:20},
        {wch:20},
        {wch:20},
        {wch:20},
        {wch:20},
        {wch:20},
        {wch:10},
        {wch:20},
      ]
    };
    this.exportToXlsxService.exportJsonToExcel(edata, `perído_desde_${fromDate.format('DD-MM-YYYY')}_hasta_${toDate.format("DD-MM-YYYY")}`, cellMerge);
  }
  
}