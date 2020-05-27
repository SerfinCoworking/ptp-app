import { Component, OnInit } from '@angular/core';
import { sidebarToggle, contentToggle } from '@shared/animations/sidebar.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  animations: [
    sidebarToggle,
    contentToggle
  ]
})
export class DashboardComponent implements OnInit {
  showSidebar: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  displaySidebar(e){
    this.showSidebar = e;
  }
}
