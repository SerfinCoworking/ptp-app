import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormGroupDirective } from '@angular/forms';
import { UserService } from '@shared/services/user.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from '@interfaces/user';
import { faUser, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  userForm: FormGroup;
  isEdit = false;
  hide = true;
  faUser = faUser;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  user: IUser;

  constructor(
    private fBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.activatedRoute.data.subscribe( data => {
      if(data.user){
        this.isEdit = true;
        this.user = data.user;
        this.editUser(data.user);
        this.password.clearValidators();
        this.password.updateValueAndValidity();
      }
    }); 
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // init user form
  initUserForm() {
    this.userForm = this.fBuilder.group({
      _id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      rfid: ['', Validators.required],
      profile: this.fBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        avatar: [''],
        dni: ['', Validators.required]
      }),
    });
  }

  // set user DB values on the form
  editUser(user: IUser) {
    this.userForm.patchValue({
      _id: user._id,
      username: user.username,
      email: user.email,
      rfid: user.rfid,
      profile: user.profile
    });
    const profile: FormGroup = this.userForm.get('profile') as FormGroup;
  }

  // Create user
  saveClickEvent(userNgForm: FormGroupDirective): void {
    if (this.userForm.valid) {
      this.subscriptions.add(
        this.userService.addUser(this.userForm.value).subscribe(
          success => {
            if (success) {
              this.router.navigate(['/dashboard/usuarios']);
            }
          },
          err => {
            err.error.map((error: { property: string | (string | number)[]; message: any; }) => {
              this.userForm.get(error.property).setErrors({ invalid: error.message});
            });
          }
      ));
    }
  }

  // update user
  updateClickEvent(userNgForm: FormGroupDirective): void {
    if (this.userForm.valid) {
      this.subscriptions.add(
        this.userService.updateUser(this.userForm.value).subscribe(
          success => {
            if (success) {
              this.router.navigate(['/dashboard/usuarios']);
            }
          },
          err => {
            err.error.map((error: { property: string | (string | number)[]; message: any; }) => {
              this.userForm.get(error.property).setErrors({ invalid: error.message});
            });
          }
      ));
    }
  }


  get username(): AbstractControl {
    return this.userForm.get('username');
  }

  get password(): AbstractControl {
    return this.userForm.get('password');
  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get rfid(): AbstractControl {
    return this.userForm.get('rfid');
  }

  get firstName(): AbstractControl {
    return this.userForm.get('profile').get('firstName');
  }

  get lastName(): AbstractControl {
    return this.userForm.get('profile').get('lastName');
  }

  get avatar(): AbstractControl {
    return this.userForm.get('profile').get('avatar');
  }

  get dni(): AbstractControl {
    return this.userForm.get('profile').get('dni');
  }

}
