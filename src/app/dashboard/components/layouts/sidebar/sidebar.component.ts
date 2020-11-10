import { Component, OnInit } from '@angular/core';
import { faHome, faCalendarAlt, faUsers, faMapMarkerAlt, faFileInvoiceDollar, faUser } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  faHome = faHome;
  faCalendarAlt = faCalendarAlt;
  faUsers = faUsers;
  faMapMarkerAlt = faMapMarkerAlt;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faUser = faUser;
  
  constructor() { }

  ngOnInit(): void {
  }

}
