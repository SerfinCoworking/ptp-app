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

  @HostBinding('class.success') success: boolean = false;
  @HostBinding('class.warning') warning: boolean = false;
  @HostBinding('class.danger') danger: boolean = false;
  @HostBinding('style.left') left: string;
  @HostBinding('style.position') position: string = 'relative';
  
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
    this.danger = false;
    this.warning  = false;
    this.success  = false;
    this.events.map((event: IEvent) => {
      const checkin = moment(event.checkin, "YYYY-MM-DD HH:mm");
      const lessThanMargin: boolean = Math.abs(now.diff(event.fromDatetime, 'minutes')) <= 30;
      const greaterThanMargin: boolean = now.diff(event.fromDatetime, 'minutes') > 30;
      const checkingGreaterThanMargin: boolean = checkin.diff(event.fromDatetime, 'minutes') > 30;
      
      if(!event.checkin && greaterThanMargin ){
        this.danger = true;
      }else if(event.checkin && checkingGreaterThanMargin && !event.corrected){
        this.warning  = true;
      }else if(event.checkin && (event.corrected || lessThanMargin) ){
        this.success  = true;
      }
    });
  }
}
