import { Component, OnInit } from '@angular/core';
import { faUserCircle, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@dashboard/services/user.service';
import { IUser } from '@interfaces/user';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})

export class ShowComponent implements OnInit {
  user: IUser | null;
  faUserCircle = faUserCircle;
  faPen = faPen;
  faSpinner = faSpinner;
  isLoading: boolean = false;

  constructor( private userService: UserService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {
      this.user = data.user;
    });
  }
}

