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
  fromDatetime: string | undefined;
  toDatetime: string | undefined;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;

  constructor() {
  }

  ngOnInit(): void {
  }

  displayEvent(fromDatetime: Moment | null, toDatetime: Moment | null): void{
    if(fromDatetime)
      this.fromDatetime = fromDatetime.format("YYYY-MM-DD HH:mm");

    if(toDatetime)
      this.toDatetime = toDatetime.format("YYYY-MM-DD HH:mm");
  }

  getEvent(): {fromDatetime: string, toDatetime: string}{
    return {fromDatetime: this.fromDatetime, toDatetime: this.toDatetime};
  }
}
