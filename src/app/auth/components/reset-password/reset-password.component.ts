import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isLoading: boolean = false;
  readonly spinnerColor: ThemePalette = 'accent';

  constructor(
    private fBuild: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar
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
      this.isLoading = true;
      this.authService.resetPassword(this.resetForm.value).subscribe(
        res => {
          // menssage
          this.isLoading = false;
          setTimeout(() => {
            if(this.authService.isPharmacistsRole()){
              this.router.navigate(['/farmacias/recetas/dispensar']);
            } else if(this.authService.isProfessionalRole()){
              this.router.navigate(['/profesionales/recetas/nueva']);
            }
          }, 5000);
          this.openSnackBar(res, "Cerrar");
        },
        err => {
          resetNgForm.resetForm();
          resetForm.reset();
          this.error = err;
          this.isLoading = false;
      });
    }
  }

  // Show a notification
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  get oldPassword(): AbstractControl {
    return this.resetForm.get('oldPassword');
  }

  get newPassword(): AbstractControl {
    return this.resetForm.get('newPassword');
  }
}