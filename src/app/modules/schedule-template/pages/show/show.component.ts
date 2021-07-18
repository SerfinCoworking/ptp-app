import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITemplate } from '@shared/models/template';
import { faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent implements OnInit {
  
  template: ITemplate | null;
  faPen = faPen;
  faSpinner = faSpinner;
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.template = data.template;
    });
  }

}
