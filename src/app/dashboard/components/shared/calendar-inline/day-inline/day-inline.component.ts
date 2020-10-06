import { Component, OnInit, Input } from '@angular/core';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'moment';

@Component({
  selector: 'app-day-inline',
  templateUrl: './day-inline.component.html',
  styleUrls: ['./day-inline.component.sass']
})
export class DayInlineComponent implements OnInit {

  @Input() day: string;
  events: Array<{fromDatetime: string | null, toDatetime: string | null}> = [];
  otherEvents: Array<{fromDatetime: string | null, toDatetime: string | null}> = [];
  fromDatetime: string | undefined;
  toDatetime: string | undefined;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;

  constructor() {
  }

  ngOnInit(): void {
  }

  displayEvents(fromDatetime: string | null, toDatetime: string | null): void{
    this.events.push({ fromDatetime, toDatetime });
  }
  
  displayOtherEvents(fromDatetime: string | null, toDatetime: string | null): void{
    this.otherEvents.push({ fromDatetime, toDatetime });
  }

  cleanEvents(){
    this.events = [];
  }
  
  cleanOtherEvents(){
    this.otherEvents = [];
  }

}
