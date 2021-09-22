import { Component, Input } from '@angular/core';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import INews from '@shared/models/news';
import { environment } from '@root/environments/environment';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent {

  @Input() day: string;
  events: Array<{fromDatetime: string | null, toDatetime: string | null}> = [];
  news: INews | null;
  fromDatetime: string | undefined;
  toDatetime: string | undefined;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  newsClass = {
    'is-feriado': false,
    'is-lic-justificada': false
  };

  displayEvents(fromDatetime: string | null, toDatetime: string | null): void{
    this.events.push({ fromDatetime, toDatetime });
  }
  
  displayNews(news: INews): void{
    this.news = news;
    this.newsClass["is-feriado"] = (news?.concept.key === environment.CONCEPT_FERIADO);
    this.newsClass["is-baja"] = (news?.concept.key === environment.CONCEPT_BAJA);
    this.newsClass["is-lic-justificada"] = (news?.concept.key === environment.CONCEPT_LIC_JUSTIFICADA);
    this.newsClass['is-suspension'] = (news.concept.key === environment.CONCEPT_SUSPENSION);
    this.newsClass['is-vaciones'] = (news.concept.key === environment.CONCEPT_VACACIONES);
    this.newsClass['is-lic-no-justificada'] = (news.concept.key === environment.CONCEPT_LIC_NO_JUSTIFICADA);
    this.newsClass['is-art'] = (news.concept.key === environment.CONCEPT_ART);
    this.newsClass['is-lic-sin-sueldo'] = (news.concept.key === environment.CONCEPT_LIC_SIN_SUELDO);
  }

  getNews(): INews{
    return this.news;
  }

  cleanEvents(){
    this.events = [];
  }
  
  cleanNews(){
    this.news = null;
  }

}
