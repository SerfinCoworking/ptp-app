import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@core/http/loader/loader.service';
import { sidebarToggle, contentToggle } from '@shared/animations/sidebar.animations';
import { Subject } from 'rxjs';

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
  isLoading$: Subject<boolean>;
  constructor(private loaderService: LoaderService) {
		this.isLoading$ = this.loaderService.isLoading;
	}

  ngOnInit(): void {
  }

  displaySidebar(e){
    this.showSidebar = e;
  }
}
