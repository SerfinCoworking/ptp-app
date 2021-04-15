import { Component, Input, OnInit } from '@angular/core';
import INews from '@interfaces/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent implements OnInit {

  @Input() news: Array<INews>;
  constructor() { }

  ngOnInit(): void {
    console.log(this.news, "novedades");
  }

}
