import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@root/environments/environment';

@Component({
  selector: 'app-dialog-status',
  templateUrl: './dialog-status.component.html',
  styleUrls: ['./dialog-status.component.sass']
})
export class DialogStatusComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  statuses: Array<any> = [
    { key: environment.CONCEPT_ALTA, name: 'Alta'},
    { key: environment.CONCEPT_ACTIVO, name: 'Activo'},
    { key: environment.CONCEPT_BAJA, name: 'Baja'}
  ];
  employeeStatus: {key: string, name: string};
  observation: string;
  
  constructor(
    public dialogRef: MatDialogRef<DialogStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private calendar: NgbCalendar){
      this.employeeStatus = this.statuses.find((status) => status.name.toUpperCase() === data.item.status?.toUpperCase());
    }

  ngOnInit(): void { }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close({eventDate: this.model, status: this.employeeStatus, observation: this.observation});
  }

  // period selection
  selectToday() {
    this.model = this.calendar.getToday();
  }
}
