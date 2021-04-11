import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ILiquidation, { IEmployeeLiquidation } from '@interfaces/liquidation';
import { faUserCircle, faPen, faSpinner, faIdCardAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.sass']
})
export class EmployeeDetailComponent implements OnInit {

  liquidation: ILiquidation;
  employeeLiq: IEmployeeLiquidation;
  faUserCircle = faUserCircle;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  active = 1;


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.activatedRoute.data.subscribe( data => {
      this.liquidation = data.liquidation;
      this.employeeLiq = this.liquidation.employee_liquidation.find((empLiq: IEmployeeLiquidation) => {
        return empLiq.employee._id === id;
      });
      console.log(this.employeeLiq, "DEBUG");
    });
  }

}
