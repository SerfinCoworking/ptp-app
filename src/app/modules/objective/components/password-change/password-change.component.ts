import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.sass']
})
export class PasswordChangeComponent implements OnInit {

  passwordForm: FormGroup = this.fBuilder.group({
    password: ["", [Validators.required, Validators.minLength(8)]],
    confirmPassword: ["", Validators.required]
  });
  hide: boolean = true; 
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  hideConfPass: boolean = true; 
  
  constructor(
    public dialogRef: MatDialogRef<PasswordChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fBuilder: FormBuilder){}

  ngOnInit(): void{
  }

  isInValidField(field: string): boolean{
    return this.passwordForm.controls[field].errors && this.passwordForm.controls[field].touched
  }

  passConfirm(): boolean{
    return this.passwordForm.get('password').value == this.passwordForm.get('confirmPassword').value;
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.passwordForm.get('password').setErrors(null);
    this.passwordForm.get('confirmPassword').setErrors(null);
    if(this.passwordForm.valid){
      if(this.passConfirm()){
        this.dialogRef.close(this.passwordForm.value);
      }else{
        this.passwordForm.get('password').setErrors({incorrect: true});
        this.passwordForm.get('confirmPassword').setErrors({ incorrect: true });
      }
    }else{
      this.passwordForm.markAllAsTouched();
    }
  }

}



