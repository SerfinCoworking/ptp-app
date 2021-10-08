import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertComponent } from '@shared/dialogs/alert/alert.component';
import { PeriodService } from '@shared/services/period.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit {

  @Input() employee: any;
  @Input() periodId: string;
  @Input() totalHs: number;
  @Input() weeks: Array<any>;
  @Output() deleteEmployeeEvent: EventEmitter<any> = new EventEmitter();

  maxHours: number = 48;
  faTrashAlt = faTrashAlt;

  constructor(private periodService: PeriodService, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  deleteEmployee(): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: `Quitar empleado ${this.employee.lastName} ${this.employee.firstName}`,
      text: `Desea quitar al empleado ${this.employee.lastName} ${this.employee.firstName} de la planificación?`,
      btnClass: "btn-danger"
     };

    this.dialog.open(AlertComponent, dialogConfig)
    .afterClosed()
    .subscribe((confirm: boolean)  => {
      if(confirm){
        
        this.periodService.deleteEmployee(this.periodId, this.employee._id).subscribe((res) => {
          console.log(res);
          this.deleteEmployeeEvent.emit();
        });

      }
    });
  }
}
