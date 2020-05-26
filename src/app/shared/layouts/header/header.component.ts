import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.username$ = this.authService.isUserNameloggedIn;
  }

  logout(){
    this.authService.logout().subscribe(success => {
      if(success){
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
