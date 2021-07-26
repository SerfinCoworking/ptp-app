import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ILiquidation, { ILiquidatedEmployee, ILiquidatedNews } from '@shared/models/liquidation';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LiquidationService } from '@shared/services/liquidation.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.sass']
})
export class EmployeeDetailComponent implements OnInit {

  liquidation: ILiquidation;
  employeeLiq: ILiquidatedEmployee;
  news: ILiquidatedNews;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  active = 1;

  constructor(private activatedRoute: ActivatedRoute, private liquidationService: LiquidationService) { }

  ngOnInit(): void {
    const { employee_id } = this.activatedRoute.snapshot.params;
    this.activatedRoute.data.subscribe( data => {
      this.liquidation = data.liquidation;
      this.employeeLiq = this.liquidation.liquidatedEmployees.find((empLiq: ILiquidatedEmployee) => {
        return empLiq.employee._id === employee_id;
      });
      this.liquidationService.liquidatedNews(this.employeeLiq.liquidated_news_id).subscribe((res) => {
        this.news = res;
      })
    });
  }

}
