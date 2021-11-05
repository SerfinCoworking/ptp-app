import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { faIdCardAlt, faCircleNotch, faCheckCircle, faMousePointer } from '@fortawesome/free-solid-svg-icons'
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '@shared/dialogs/alert/alert.component';
import { SocketIoService } from '@shared/services/socket-io.service';

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
  faMousePointer = faMousePointer;
  isSubmiting: boolean = false;
  msg: string = "";
  textDange: boolean = false;
  showMsg: boolean = false;

  isSubmitedSuccess: boolean = false;
  color: string = 'green';
  inFocus: boolean = true;
  private objectiveId: string;

  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private socketService: SocketIoService    
  ) {}

  ngOnInit(): void {
    this.objectiveId = this.authService.getLoggedUserId();
    this.initSignedForm();
    
    this.socketService.listenIoServer('user:signingFail').subscribe((data) => {
      this.msg = data.error
      this.textDange = true;
      this.rfid.setValue('');
      setTimeout(() => {
        this.showMsg = true;
        setTimeout(() => {
          this.isSubmiting = false;
          this.showMsg = false;
        },3000);
      },3000);
    });

    this.socketService.listenIoServer('user:signingSuccess').subscribe((data) => {
      this.msg = data.msg;
      this.textDange = false;
      this.rfid.setValue('');
      setTimeout(() => {
        this.showMsg = true;
        setTimeout(() => {
          this.isSubmiting = false;
          this.showMsg = false;
        },3000);
      },3000);
    })
  }

  initSignedForm() {
    this.signedForm = this.fBuilder.group({
      objectiveId: [this.objectiveId],
      rfid: ['']
    });
    this.rfidInput?.nativeElement.focus();
  }

  get rfid(): AbstractControl {
    return this.signedForm.get('rfid');
  }

  onSubmitForm(){
    this.isSubmiting = true;
    this.socketService.emitToServer('user:signing', this.signedForm.value );
  }

  triggerRfidFocus(){
    this.rfidInput.nativeElement.focus();
  }
  setGreenColor(){
    this.color = 'green';
    this.inFocus = true;
  }

  setRedColor(){
    this.color = 'red';
    this.inFocus = false;
  }

  openDialog(title: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { title };
    this.dialog.open(AlertComponent, dialogConfig)
    .afterClosed()
    .subscribe((success: boolean)  => {
      if (success) {
        this.rfid.setValue('');
        this.isSubmiting = false;
      }
    });
  }
}
