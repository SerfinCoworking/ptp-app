import { Component, Input } from '@angular/core';
import INews from '@shared/models/news';
import { faCalendarDay, faDollarSign, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent {

  @Input() news: Array<INews>;
  @Input() totalHoursShouldBeWork: number | undefined;
  @Input() totalHoursWorked: number | undefined;
  @Input() importe: number | undefined;
  @Input() workingDays: Array<string> | undefined;

  faClock = faClock;
  faCalendarDay = faCalendarDay;
  faDollarSign = faDollarSign;
  faExternalLinkAlt = faExternalLinkAlt;
}
