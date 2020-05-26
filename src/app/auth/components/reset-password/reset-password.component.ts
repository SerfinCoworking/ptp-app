import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  error: string;
  showSubmit: boolean = false;
  // readonly spinnerColor: ThemePalette = 'accent';
  readonly spinnerColor: ThemePalette = 'primary';
  readonly spinnerDiameter: number = 30;

  constructor(
    private fBuild: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.initResetForm();
  }

  initResetForm(){
    this.resetForm = this.fBuild.group({
      oldPassword: ['', [
        Validators.required
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  onSubmitEvent(resetForm: FormGroup, resetNgForm: FormGroupDirective): void{
    if(this.resetForm.valid){
      this.showSubmit = true;
      this.authService.resetPassword(this.resetForm.value).subscribe(
        res => {
          // menssage
          this.showSubmit = false;
          this.router.navigate(['/dashboard/home']);
        },
        err => {
          resetNgForm.resetForm();
          resetForm.reset();
          this.error = err;
          this.showSubmit = false;
      });
    }
  }

  backClicked() {
    this._location.back();
  }

  get oldPassword(): AbstractControl {
    return this.resetForm.get('oldPassword');
  }

  get newPassword(): AbstractControl {
    return this.resetForm.get('newPassword');
  }
}
