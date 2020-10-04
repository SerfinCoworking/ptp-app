import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IPeriod } from '@interfaces/schedule';
import * as moment from 'moment';

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
    console.log(e);
    this.fromDate = e.rangeFrom ? moment().set({'year': e.rangeFrom.year, 'month': (e.rangeFrom.month - 1), 'date': e.rangeFrom.day}) :  null;
    this.toDate = e.rangeTo ? moment().set({'year': e.rangeTo.year, 'month': (e.rangeTo.month - 1), 'date': e.rangeTo.day}) :  null;
  }
}
