import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '@interfaces/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidebarToggleEvent = new EventEmitter();

  username$: Observable<string>;
  currentUser$: Observable<IUser>;
  currentUser: IUser;
  showSidebar: boolean = true;
  private subscriptions: Subscription = new Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.add(
    this.authService.currentUserLoggedIn.subscribe( (currentUser: IUser) => {
      this.currentUser = currentUser;
    }));
  }

  ngOnDestroy():void{
    this.subscriptions.unsubscribe();
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
