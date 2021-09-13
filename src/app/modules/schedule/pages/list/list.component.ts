import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  constructor(private activetedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activetedRoute.data.subscribe( data => {
      console.log(data);
      // this.updateTable(data.objectives);
    });
  }

}
