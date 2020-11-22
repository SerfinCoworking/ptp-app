import { Component, OnInit, Input } from '@angular/core';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import INews from '@interfaces/news';
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
  news: INews | null;
  fromDatetime: string | undefined;
  toDatetime: string | undefined;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  newsClass = {
    'is-feriado': false,
    'is-lic-justificada': false
  };

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
  
  displayNews(news: INews): void{
    this.news = news;
    this.newsClass["is-feriado"] = (news?.concept.key === 'FERIADO');
    this.newsClass["is-lic-justificada"] = (news?.concept.key === 'LIC_JUSTIFICADA');
  }

  cleanEvents(){
    this.events = [];
  }
  
  cleanOtherEvents(){
    this.otherEvents = [];
  }
  
  cleanNews(){
    this.news = null;
  }

}
