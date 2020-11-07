import { Component, OnInit } from '@angular/core';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';
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
  dataSource: ILiquidation[] = [];
  stickyHeaders: Array<string> = ['header-1'];
  stickyColumns: Array<string> = [];

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
    this.displayedColumns[18]= 'lic_por_nacimiento';
    this.displayedColumns[19]= 'plus_resp';
    this.displayedColumns[20]= 'presentismo';
    this.displayedColumns[21]= 'embargo';
    this.displayedColumns[22]= 'observacion';

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
  // isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
  //   return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  // }
}

