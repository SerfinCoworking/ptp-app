import { Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { IEmployeeShort } from '@shared/models/employee';
import { IEvent } from '@shared/models/schedule';
import { ImageService } from '@shared/services/image.service';
import { SocketIoService } from '@shared/services/socket-io.service';
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

  constructor(private el: ElementRef, private imageService: ImageService, private sockectService: SocketIoService) {
    imageService.imageLoading(el.nativeElement);
  }

  successLeft: boolean = false;
  warningLeft: boolean = false;
  dangerLeft: boolean = false;
  successRight: boolean = false;
  warningRight: boolean = false;
  dangerRight: boolean = false;

  @HostBinding('style.left') left: string;
  @HostBinding('style.position') position: string = 'relative';
  @HostBinding('style.z-index') zIndex: string = '1';
  
  @HostListener('error')
  onError() {
    this.imageService.imageLoadedOrError(this.el.nativeElement);
    this.showInitials = !this.showInitials;
  }

  ngOnInit(): void {
    
    this.setEventsStatus();
    this.sockectService.listenIoServer('event:update').subscribe((res) => {
      const eventIndex: number = this.events.findIndex((event: IEvent) => event._id === res.event._id);
      if(eventIndex >= 0){
        this.events[eventIndex] = {...res.event};
        this.setEventsStatus();
      }
    });
  }

  setEventsStatus(): void{
    const now = moment();
    this.dangerLeft = false;
    this.warningLeft = false;
    this.successLeft = false;

    this.dangerRight = false;
    this.warningRight = false;
    this.successRight = false;

    this.events.map((event: IEvent) => {
      const checkin = moment(event.checkin, "YYYY-MM-DD HH:mm");
      const checkinLessThanMargin: boolean = Math.abs(now.diff(event.fromDatetime, 'minutes')) <= 30;
      const checkinGreaterThanMargin: boolean = now.diff(event.fromDatetime, 'minutes') > 30;
      const checkingGreaterThanMargin: boolean = checkin.diff(event.fromDatetime, 'minutes') > 30;
      
      const checkout = moment(event.checkout, "YYYY-MM-DD HH:mm");
      const checkoutLessThanMargin: boolean = Math.abs(now.diff(event.toDatetime, 'minutes')) <= 30;
      const checkoutGreaterThanMargin: boolean = now.diff(event.toDatetime, 'minutes') > 30;
      const checkoutingGreaterThanMargin: boolean = checkout.diff(event.toDatetime, 'minutes') > 30;
      
      if(!event.checkin && checkinGreaterThanMargin ){
        this.dangerLeft = true;
      }else if(event.checkin && checkingGreaterThanMargin && !event.corrected){
        this.warningLeft  = true;
      }else if(event.checkin && (event.corrected || checkinLessThanMargin) ){
        this.successLeft  = true;
      }
      
      if(!event.checkout && checkoutGreaterThanMargin ){
        this.dangerRight = true;
      }else if(event.checkout && checkoutingGreaterThanMargin && !event.corrected){
        this.warningRight  = true;
      }else if(event.checkout && (event.corrected || checkoutLessThanMargin) ){
        this.successRight  = true;
      }
    });
  }
}
