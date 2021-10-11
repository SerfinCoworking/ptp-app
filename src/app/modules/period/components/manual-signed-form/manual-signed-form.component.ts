import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faCheck, faTimes, faCalendar, faSave  } from '@fortawesome/free-solid-svg-icons';
import { IEvent } from '@shared/models/schedule';
import { SignedService } from '@shared/services/signed.service';
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
  @Output() eventEvent: EventEmitter<IEvent> = new EventEmitter<IEvent>();
   
  signedDatetime: moment.Moment;
  eventValues: any; 

  spinners: boolean = false;
  faCheck = faCheck;
  faTimes = faTimes;
  faPen = faPen;
  faCalendar = faCalendar;
  faSave = faSave;
  description: string;
  isEdit: boolean = false;

  constructor(private signedService: SignedService) { }

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
    if(this.type === 'checkin'){

      this.event.checkin = moment(this.eventValues.day, "DD/MM/YYYY").set({
        hour: this.eventValues.time.hour,
        minute: this.eventValues.time.minute
      }).format("YYYY-MM-DD HH:mm");
      this.event.checkinDescription = this.description;
      
      this.isEdit = !this.isEdit;
    }else{
      this.event.checkout = moment(this.eventValues.day, "DD/MM/YYYY").set({
        hour: this.eventValues.time.hour,
        minute: this.eventValues.time.minute
      }).format("YYYY-MM-DD HH:mm");
      this.event.checkoutDescription = this.description;

      this.isEdit = !this.isEdit;
    }

    this.signedService.manualSignInOut(this.periodId, this.employeeId, this.event).subscribe((res) => {
      console.log(res);
      this.eventEvent.emit(this.event);
    })
  }
 
}
