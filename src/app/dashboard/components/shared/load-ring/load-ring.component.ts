import { Component, Input, OnInit } from '@angular/core';
import { IShift } from '@shared/models/schedule';
import * as moment from 'moment';
@Component({
  selector: 'app-load-ring',
  templateUrl: './load-ring.component.html',
  styleUrls: ['./load-ring.component.sass']
})
export class LoadRingComponent implements OnInit {
  @Input() shift: IShift;
  @Input() circuleDimRem: {
    width: number;
    height: number;
  };
  circunferenceIn: number = 0;
  circunferenceOut: number = 0;
  signedIn: string = 'ENABLED';
  signedOut: string = 'ENABLED';
  k_r: number = 0.490566038;
  k_cx_cy: number = 0.501886792;
  k_stroke: number = 43.396226415;
  circuleStyle: {
    r: string;
    cx: string;
    cy: string;
    'stroke-dasharray': string;
  };

  circuleDimStyle: {
    width: string;
    height: string;
  };

  constructor() { 
  }
  // obtener input con los valores del stroke ingreso / salida
  ngOnInit():void{
    this.circuleDimStyle = {
      width: `${this.circuleDimRem.width}rem`,
      height: `${this.circuleDimRem.height}rem` 
    }
    this.circuleStyle = {
      r: `${this.circuleDimRem.width * this.k_r}rem`,
      cx: `${this.circuleDimRem.width * this.k_cx_cy}rem`,
      cy: `${this.circuleDimRem.width * this.k_cx_cy}rem`,
      'stroke-dasharray': `calc(${this.circuleDimRem.width * this.k_stroke} / 2)`,
    };

    const now = moment();
    this.shift.events.map((event: any) => {
      // 4 Estados:
      // ENABLED: in time to checkin / checkout
      // OUT_OF_TIME: out of permited range checkin / checkout
      // FAIL: not checkin / checkout
      // SUCCESS: in range permited checkin / checkout
      
      
      if(event.checkin){
        const checkin = moment(event.checkin);
        this.signedIn = ((checkin.diff(event.fromDatetime, 'minutes') > 30 || moment(event.fromDatetime).diff(checkin, 'minutes') > 30) && !event.corrected) ? 'OUT_OF_TIME' : 'SUCCESS';
      }else if(now.diff(event.fromDatetime, 'minutes') > 30){
        this.signedIn = 'FAIL';
      }

      if(event.checkout){
        // checkeo si marco más de 30 minutos antes de su horario de salida definido
        const checkout = moment(event.checkout);
        this.signedOut = ((checkout.diff(event.toDatetime, 'minutes') > 30 || moment(event.toDatetime).diff(checkout, 'minutes') > 30) && !event.corrected) ? 'OUT_OF_TIME' : 'SUCCESS';
      }else if(now.diff(event.toDatetime, 'minutes') > 30){
        this.signedOut = 'FAIL';
      }
    })
  }
}
