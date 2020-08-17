import { Component, OnInit, SimpleChanges, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { IUser } from '@interfaces/user';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.sass']
})
export class UserShowComponent implements OnChanges, OnInit {
  @Output() hideUserEvent = new EventEmitter();
  // tslint:disable-next-line:no-input-rename
  @Input('user') userInp: IUser;
  user: IUser | null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userInp) {
      this.user = changes.userInp.currentValue;
    }
  }

  ngOnInit(): void {
  }

  closeShow(): void {
    this.hideUserEvent.emit();
  }

}
