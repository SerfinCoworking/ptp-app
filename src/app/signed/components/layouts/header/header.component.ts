import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IObjective } from '@interfaces/objective';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidebarToggleEvent = new EventEmitter();

  username$: Observable<string>;
  currentUser$: Observable<IObjective>;
  currentUser: IObjective;
  showSidebar = true;
  private subscriptions: Subscription = new Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.add(
    this.authService.currentUserLoggedIn.subscribe( (currentUser: IObjective) => {
      this.currentUser = currentUser;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
