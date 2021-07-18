import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ILiquidation, { IEmployeeLiquidation } from '@shared/models/liquidation';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.sass']
})
export class EmployeeDetailComponent implements OnInit {

  liquidation: ILiquidation;
  employeeLiq: IEmployeeLiquidation;
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
    });
  }

}
