import { Component, OnInit } from '@angular/core';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';


@Component({
  selector: 'app-staff-liquidation',
  templateUrl: './staff-liquidation.component.html',
  styleUrls: ['./staff-liquidation.component.sass']
})
export class StaffLiquidationComponent {


  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;

  // tables = [0];

  constructor() {
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
    this.displayedColumns[18]= 'lic_por_nacimiento';
    this.displayedColumns[19]= 'plus_resp';
    this.displayedColumns[20]= 'presentismo';
    this.displayedColumns[21]= 'embargo';
    this.displayedColumns[22]= 'observacion';

  }

  /** Whether the button toggle group contains the id as an active value. */
  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


