import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ILiquidation, { ILiquidatedEmployee, ILiquidatedNews } from '@shared/models/liquidation';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LiquidationService } from '@shared/services/liquidation.service';
import IEmployeeLiquidated from '@shared/models/employee-liquidated.interface';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.sass']
})
export class EmployeeDetailComponent implements OnInit {

  employeeLiq: IEmployeeLiquidated;
  news: ILiquidatedNews;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  active = 1;

  constructor(private activatedRoute: ActivatedRoute, private liquidationService: LiquidationService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.employeeLiq = data.employeeLiquidated;
      if(this.employeeLiq.liquidated_news_id){
        this.liquidationService.liquidatedNews(this.employeeLiq.liquidated_news_id).subscribe((res) => {
          this.news = res;
        });
      }
    });
  }

}
