import { Component, OnInit } from '@angular/core';
import { faHome,
  faCalendarAlt,
  faUsers,
  faMapMarkerAlt,
  faFileInvoiceDollar,
  faUser,
  faFileAlt,
  faBars } from '@fortawesome/free-solid-svg-icons'

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
  faFileAlt = faFileAlt;
  faBars = faBars;
  
  constructor() { }

  ngOnInit(): void {
  }

}
