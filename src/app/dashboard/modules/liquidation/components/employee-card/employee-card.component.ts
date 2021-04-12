import { Component, Input } from '@angular/core';
import { IEmployeeLiq } from '@interfaces/liquidation';
import { faUserCircle, faPen, faSpinner, faIdCardAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.sass']
})
export class EmployeeCardComponent {

  @Input() employee: IEmployeeLiq;
  
  faUserCircle = faUserCircle;
}
