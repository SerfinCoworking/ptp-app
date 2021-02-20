import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IShift } from '@interfaces/schedule';
import * as moment from 'moment';
@Component({
  selector: 'app-load-ring',
  templateUrl: './load-ring.component.html',
  styleUrls: ['./load-ring.component.sass']
})
export class LoadRingComponent implements OnInit {
  // @Input() signedIn: string;
  // @Input() signedOut: string;
  @Input() shift: IShift;
  circunferenceIn: number = 0;
  circunferenceOut: number = 0;
  // signedIn: string;
  // signedOut: string;
  signedIn: string = 'ENABLED';
  signedOut: string = 'ENABLED';

  constructor() { }
  // obtener input con los valores del stroke ingreso / salida
  ngOnInit():void{
  // ngOnChanges(changes: SimpleChanges):void{
    // if(changes.shifts && changes.shifts.currentValue){

      const now = moment();
      this.shift.events.map((event: any) => {
        // 4 Estados:
        // ENABLED: in time to checkin / checkout
        // OUT_OF_TIME: out of permited range checkin / checkout
        // FAIL: not checkin / checkout
        // SUCCESS: in range permited checkin / checkout
        
        
        if(event.checkin){
          const checkin = moment(event.checkin);
          this.signedIn = (checkin.diff(event.fromDatetime, 'minutes') > 30 || moment(event.fromDatetime).diff(checkin, 'minutes') > 30) ? 'OUT_OF_TIME' : 'SUCCESS';
        }else if(now.diff(event.fromDatetime, 'minutes') > 30){
          this.signedIn = 'FAIL';
        }

        if(event.checkout){
          // checkeo si marco más de 30 minutos antes de su horario de salida definido
          const checkout = moment(event.checkout);
          this.signedOut = checkout.diff(event.toDatetime, 'minutes') > 30 || moment(event.toDatetime).diff(checkout, 'minutes') > 30 ? 'OUT_OF_TIME' : 'SUCCESS';
        }else if(now.diff(event.toDatetime, 'minutes') > 30){
          this.signedOut = 'FAIL';
        }

      });
    // }
  }

}
