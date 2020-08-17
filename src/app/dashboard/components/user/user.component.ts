import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '@dashboard/services/user.service';
import { panelOne, panelTwo } from '@shared/animations/wrapper-content';
import { IUser } from '@interfaces/user';
@Component({
  selector: 'app-user-submenu',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  animations: [
    panelOne,
    panelTwo
  ]
})
export class UserComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  isVisibleShow = false;
  user: IUser | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  showUser(userId: string) {
    this.subscription.add(
      this.userService.getUser(userId).subscribe(
        (user: IUser) => {
          this.user = user;
          this.isVisibleShow = true;
        }
      )
    );
  }

  hideUser() {
    this.user = null;
    this.isVisibleShow = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
