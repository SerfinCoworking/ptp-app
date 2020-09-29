import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { faIdCardAlt, faCircleNotch, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { SignedService } from '../../services/signed.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  @ViewChild('rfidInput', {static: true}) rfidInput: ElementRef;

  signedForm: FormGroup;
  faIdCardAlt = faIdCardAlt;
  faCircleNotch = faCircleNotch;
  faCheckCircle = faCheckCircle;
  isSubmiting: boolean = false;
  isSubmitedSuccess: boolean = false;
  color: string = 'red';
  private objectiveId: string;

  constructor(
    private fBuilder: FormBuilder,
    private signedService: SignedService,
    private authService: AuthService,

    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.objectiveId = this.authService.getLoggedUserId();
    this.initSignedForm();
  }

  initSignedForm() {
    this.signedForm = this.fBuilder.group({
      objectiveId: [this.objectiveId],
      rfid: ['']
    });
    this.rfidInput.nativeElement.focus();
  }

  get rfid(): AbstractControl {
    return this.signedForm.get('rfid');
  }

  onSubmitForm(){
    this.isSubmiting = true;
    this.signedService.signInOutEmployee(this.signedForm.value).subscribe((res) => {
      this.isSubmiting = false;
      this.isSubmitedSuccess = true;
      this.rfid.setValue('');
      setTimeout(() => {
        this.isSubmitedSuccess = false;
      }, 2500);
    });
  }

  triggerRfidFocus(){
    this.rfidInput.nativeElement.focus();
  }
  setGreenColor(){
    this.color = 'green';
  }

  setRedColor(){
    this.color = 'red';
  }
}
