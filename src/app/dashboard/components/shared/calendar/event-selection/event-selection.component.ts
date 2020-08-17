import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPeriod, IShift, IEvent } from '@interfaces/schedule';
import * as moment from 'moment';
import { TimeSelectionComponent } from '@dashboard/components/shared/dialogs/time-selection/time-selection.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-event-selection',
  templateUrl: './event-selection.component.html',
  styleUrls: ['./event-selection.component.sass']
})
export class EventSelectionComponent implements OnInit {

  @Output() setShiftEvent = new EventEmitter();
  @Input() builder: Array<string[]>;
  @Input() xAxis: string;
  @Input() shift: IShift;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void{
    console.log(this.shift);
  }


  openDialog(cdate: string) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = { item: `Desea eliminar al objetivo ?`, title: "Eliminar objetivo" };
    dialogConfig.data = { employee: this.shift.employee, cdate };
    // this.setShiftEvent.emit();

    this.dialog.open(TimeSelectionComponent, dialogConfig)
    .afterClosed()
    .subscribe((reseult: any)  => {
      if (reseult) {
        console.log(reseult.event, "==============DEBUG SUCCESS");
        // this.isDeleting[objective._id] = true;
        // this.objectiveService.deleteObjective(objective._id).subscribe(res => {
        //   this.isDeleted[objective._id] = true;
        //   this.getData(this.search, this.sort, this.pageIndex, this.pageSize);
        // });
      }
    });
  }
}
