import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarToggleEvent = new EventEmitter();

  username$: Observable<string>;
  showSidebar: boolean = true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username$ = this.authService.isUserNameloggedIn;
  }

  logout(){
    this.authService.logout().subscribe(success => {
      if(success){
        this.router.navigate(['/auth/login']);
      }
    });
  }

  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
    this.sidebarToggleEvent.emit(this.showSidebar);
  }
}
