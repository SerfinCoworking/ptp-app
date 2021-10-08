import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private periodService: PeriodService) { }

  ngOnInit(): void {
  }

  deleteEmployee(): void{
    this.periodService.deleteEmployee(this.periodId, this.employee._id).subscribe((res) => {
      console.log(res);
      this.deleteEmployeeEvent.emit();
    })
  }
}
