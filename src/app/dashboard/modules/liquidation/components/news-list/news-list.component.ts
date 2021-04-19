import { Component, Input, OnInit } from '@angular/core';
import INews from '@interfaces/news';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent implements OnInit {

  @Input() news: Array<INews>;
  @Input() totalHours: number | undefined;
  @Input() workingDays: Array<string> | undefined;

  faClock = faClock;
  faCalendarDay = faCalendarDay;

  constructor() { }

  ngOnInit(): void {
    console.log(this.news, "novedades");

  }

}
