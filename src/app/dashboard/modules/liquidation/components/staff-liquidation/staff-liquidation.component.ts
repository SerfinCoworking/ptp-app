import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LiquidationService } from '@dashboard/services/liquidation.service';
import ILiquidation from '@interfaces/liquidation';


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
  private headerHeight: number = 4.071;
  private rowHeight: number = 3.5;
  stickyRows: Array<string> = [];
  stickyRowsStyle = [
    {
      position: "sticky",
      top: `${this.headerHeight}rem`,
      bottom: "0rem",
      'z-index': 100,
      'background-color': 'rebeccapurple'
    },{
      position: "sticky",
      top: `${this.headerHeight + this.rowHeight}rem`,
      bottom: "0rem",
      'z-index': 100,
      'background-color': 'rebeccapurple'
    },{
      position: "sticky",
      top: `${this.headerHeight + (this.rowHeight * 2)}rem`,
      bottom: "0rem",
      'z-index': 100,
      'background-color': 'rebeccapurple'
    },{
      position: "sticky",
      top: `${this.headerHeight + (this.rowHeight * 3)}rem`,
      bottom: "0rem",
      'z-index': 100,
      'background-color': 'rebeccapurple'
    },{
      position: "sticky",
      top: `${this.headerHeight + (this.rowHeight * 4)}rem`,
      bottom: "0rem",
      'z-index': 100,
      'background-color': 'rebeccapurple'
    },{
      position: "sticky",
      top: `${this.headerHeight + (this.rowHeight * 5)}rem`,
      bottom: "0rem",
      'z-index': 100,
      'background-color': 'rebeccapurple'
    }
  ];

  constructor(private liquidationService: LiquidationService, private activatedRoute: ActivatedRoute) {
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
    this.displayedColumns[11]= 'licencia';
    this.displayedColumns[12]= 'total_lic';
    this.displayedColumns[13]= 'lic_jus';
    this.displayedColumns[14]= 'aus_no_jus';
    this.displayedColumns[15]= 'suspencion';
    this.displayedColumns[16]= 'adelantos';
    this.displayedColumns[17]= 'vacaciones';
    this.displayedColumns[18]= 'art';
    this.displayedColumns[19]= 'plus_resp';
    this.displayedColumns[20]= 'presentismo';
    this.displayedColumns[21]= 'embargo';
    this.displayedColumns[22]= 'observacion';
    this.columnsToDisplay = this.displayedColumns.slice();
  }

  ngOnInit(): void {
    const { fromDate, toDate } = this.activatedRoute.snapshot.queryParams;

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
  
}