import { Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { IEmployeeShort } from '@shared/models/employee';
import { IEvent } from '@shared/models/schedule';
import { ImageService } from '@shared/services/image.service';
import moment from 'moment';

@Component({
  selector: 'app-employee-indicator',
  templateUrl: './employee-indicator.component.html',
  styleUrls: ['./employee-indicator.component.sass']
})
export class EmployeeIndicatorComponent implements OnInit {

  @Input() employee: IEmployeeShort;
  @Input() events: Array<IEvent> = [];
  
  showInitials: boolean = false;

  constructor(private el: ElementRef, private imageService: ImageService) {
    imageService.imageLoading(el.nativeElement);
  }

  @HostBinding('class.success') success: boolean = false;
  @HostBinding('class.info') info: boolean = false;
  @HostBinding('class.warning') warning: boolean = false;
  @HostBinding('class.danger') danger: boolean = false;
  
  @HostListener('error')
  onError() {
    this.imageService.imageLoadedOrError(this.el.nativeElement);
    this.showInitials = !this.showInitials;
  }

  ngOnInit(): void {
    const now = moment();
    this.events.map((event: IEvent) => {
      const checkin = moment(event.checkin, "YYYY-MM-DD HH:mm");
      const lessThanMargin: boolean = Math.abs(now.diff(event.fromDatetime, 'minutes')) <= 30;
      const greaterThanMargin: boolean = now.diff(event.fromDatetime, 'minutes') > 30;
      const checkingGreaterThanMargin: boolean = checkin.diff(event.fromDatetime, 'minutes') > 30;
      console.log(event.checkin ,event.corrected, lessThanMargin)
      if(event.checkin && (event.corrected || lessThanMargin) ){
        this.success  = true;
      }else if(!event.checkin && lessThanMargin ){
        this.info  = true;
      }else if(event.checkin && checkingGreaterThanMargin){
        this.warning  = true;
      }else if(!event.checkin && greaterThanMargin ){
        this.danger = true;
      }
    });
  }


}
