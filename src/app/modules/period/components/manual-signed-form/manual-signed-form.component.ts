import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { faPen, faCalendar, faSave  } from '@fortawesome/free-solid-svg-icons';
import { IEvent } from '@shared/models/schedule';
import { SocketIoService } from '@shared/services/socket-io.service';
import moment from 'moment';

@Component({
  selector: 'app-manual-signed-form',
  templateUrl: './manual-signed-form.component.html',
  styleUrls: ['./manual-signed-form.component.sass']
})
export class ManualSignedFormComponent implements OnInit {
  
  @Input() event!: IEvent;
  @Input() periodId: string;
  @Input() employeeId: string;
  @Input() type: string;
   
  signedDatetime: moment.Moment;
  eventValues: any; 

  spinners: boolean = false;
  faPen = faPen;
  faCalendar = faCalendar;
  faSave = faSave;
  description: string;
  isEdit: boolean = false;
  isInvalid: boolean = false;

  constructor(private authService: AuthService, private sockectService: SocketIoService) { }

  ngOnInit(): void {

    let value: string;
    if(this.type === 'checkin'){
      this.isEdit = !!this.event.checkin;
      value = this.event.checkin || this.event.fromDatetime;
      this.description = this.event.checkinDescription;
    }else{
      this.isEdit = !!this.event.checkout;
      value = this.event.checkout || this.event.toDatetime;
      this.description = this.event.checkoutDescription;
    }

    this.signedDatetime = moment(new Date(value), "YYYY-MM-DD HH:mm");
    this.eventValues = {
      day: this.signedDatetime.format('DD/MM/YYYY'),
      time: {
        hour: this.signedDatetime.get('hours'),
        minute: this.signedDatetime.get('minute')
      }
    };      
  }

  saveSigned(): void{
    const selectedTime = moment(this.eventValues.day, "DD/MM/YYYY").set({
      hour: this.eventValues.time.hour,
      minute: this.eventValues.time.minute
    });

    if(this.type === 'checkin'){
      if((this.event.checkout && selectedTime.isBefore(this.event.checkout)) || !this.event.checkout){

        this.event.checkin = selectedTime.format("YYYY-MM-DD HH:mm");
        this.event.checkinDescription = this.description;        
        this.isEdit = !this.isEdit;
        this.isInvalid = false;
      }else{
        this.isInvalid = true;
      }
      this.event.checkin_corrected = true;
    }else{
      
      if((this.event.checkin && selectedTime.isAfter(this.event.checkin)) || 
      (!this.event.checkin && selectedTime.isAfter(this.event.fromDatetime))){
        
        this.event.checkout = selectedTime.format("YYYY-MM-DD HH:mm");
        this.event.checkoutDescription = this.description;
        this.isEdit = !this.isEdit;
        this.isInvalid = false;
      }else{
        this.isInvalid = true;
      }
      this.event.checkout_corrected = true;

    }

    if(!this.isInvalid){
      const userId = this.authService.getLoggedUserId();
      this.sockectService.emitToServer('event:update', { periodId: this.periodId, employeeId: this.employeeId, event: this.event, user: userId });
    }
  }
 
}
