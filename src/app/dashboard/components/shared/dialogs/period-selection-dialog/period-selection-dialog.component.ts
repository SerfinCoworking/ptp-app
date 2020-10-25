import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IPeriod } from '@interfaces/schedule';
import * as moment from 'moment';
import { ConfirmComponent } from '@dashboard/components/shared/dialogs/confirm/confirm.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-period-selection-dialog',
  templateUrl: './period-selection-dialog.component.html',
  styleUrls: ['./period-selection-dialog.component.sass']
})
export class PeriodSelectionDialogComponent implements OnInit {

  period: IPeriod | null;
  fromDate: moment.Moment | null;
  toDate: moment.Moment | null;
  error: any = {message: ""};

    constructor(
      private dialog: MatDialog,
      public dialogRef: MatDialogRef<PeriodSelectionDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    if(this.data.period){
      this.period = this.data.period;
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {

    if(this.fromDate && this.toDate){
      this.dialogRef.close({fromDate: this.fromDate, toDate: this.toDate});
    }else{
      this.error.message = "Debe seleccionar una fecha de inico y una fecha de fin al período."
    }
  }

  rangeSelection(e){
    this.fromDate = e.rangeFrom ? moment().set({'year': e.rangeFrom.year, 'month': (e.rangeFrom.month - 1), 'date': e.rangeFrom.day}) :  null;
    this.toDate = e.rangeTo ? moment().set({'year': e.rangeTo.year, 'month': (e.rangeTo.month - 1), 'date': e.rangeTo.day}) :  null;
  }

  openDialog(): void {

    if((typeof(this.fromDate) === 'undefined' || this.fromDate.isSame(this.period.fromDate)) && (typeof(this.toDate) === 'undefined' || this.toDate.isSame(this.period.toDate)) ){
      this.close();
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item: `Si modifica las fechas del período también se eliminarán todas las guardias cargadas.`, title: `Modificar fechas del período ${moment(this.period.fromDate).format("DD MMM YYYY")} - ${moment(this.period.toDate).format("DD MMM YYYY")}?` };
    this.dialog.open(ConfirmComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.confirm();
      }
    });
  }
}
