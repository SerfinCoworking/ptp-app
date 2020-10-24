import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators, FormGroupDirective } from '@angular/forms';
import { EmployeeService } from '@dashboard/services/employee.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployee } from '@interfaces/employee';
import { IPhone } from '@interfaces/embedded.documents';
import { faIdCardAlt, faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.sass']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  @ViewChild('saveEmployeBtn', {static: true}) saveEmployeBtn: MatButton;
  @ViewChild('rfidInput', {static: true}) rfidInput: ElementRef;
  private subscriptions: Subscription = new Subscription();
  employeeForm: FormGroup;
  isEdit = false;
  faIdCardAlt = faIdCardAlt;
  faUserCircle = faUserCircle;
  faSpinner = faSpinner;
  isFocusIn: boolean = false;
  isLoading: boolean = false;
  lastRfidValue: number | null;

  // statuses color
  initialStatus: string = "#3c3c3c";
  focusinStatus: string = "#3a416d"
  successedStatus: string = "#4aa746";
  failedStatus: string = "#dc3b45";

  cardStatusColor: string = this.initialStatus;
  message: string = 'Click en el icono para asignar tarjeta';
  statusFail: boolean = false;
  employers: Array<string> = [
    'PTP',
    'ITSA'
  ];

  constructor(
    private fBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initEmployeeForm();

    // get param id on edit
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.subscriptions.add(
        this.employeeService.getEmployee(id).subscribe(
          employee => {
            this.isEdit = true;
            this.editEmployee(employee);
            if(employee.rfid){
              this.cardStatusColor = this.successedStatus;
              this.message = `Id de tarjeta: ${this.rfid.value}`;
            }
        }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // init employee form
  initEmployeeForm() {
    this.employeeForm = this.fBuilder.group({
      _id: [''],
      enrollment: ['', Validators.required],
      rfid: [''],
      profile: this.fBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        avatar: [''],
        dni: ['', Validators.required],
        admissionDate: ['', Validators.required],
        employer: ['', Validators.required]
      }),
      contact: this.fBuilder.group({
        email: [''],
        address: this.fBuilder.group({
          street: [''],
          streetNumber: [''],
          department: [''],
          manz: [''],
          lote: [''],
          neighborhood: [''],
          city: [''],
          province: [''],
          zip: ['']
        }),
        phones: this.fBuilder.array([
          this.fBuilder.group({
            area: ['', Validators.required],
            line: ['', Validators.required]
          })
        ])
      })
    });
  }

  // set employee DB values on the form
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      _id: employee._id,
      enrollment: employee.enrollment,
      rfid: employee.rfid,
      profile: employee.profile,
      contact: employee.contact
    });
    const contact: FormGroup = this.employeeForm.get('contact') as FormGroup;
    contact.setControl('phones', this.setExistingPhones(employee.contact.phones));
  }

  // set phones array
  setExistingPhones(phoneSets: IPhone[]): FormArray {
    const formArray = new FormArray([]);
    phoneSets.forEach( phone => {
      formArray.push(
        this.fBuilder.group({
          area: phone.area,
          line: phone.line
        })
      );
    });
    return formArray;
  }

  // Create employee
  saveClickEvent(employeeNgForm: FormGroupDirective): void {
    if(!this.rfid.value){
      this.cardStatusColor = this.failedStatus;
      this.message = "Debe asignar una tarjeta de fichado al empleado" ;
      this.statusFail = true;
      this.rfid.setErrors({'invalid': true});
    }

    if (this.employeeForm.valid) {
      this.isLoading = !this.isLoading;
      this.subscriptions.add(
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/dashboard/empleados']);
          }
        }
      ));
    }
  }
      
  // update employee
  updateClickEvent(employeeNgForm: FormGroupDirective): void {
    if(!this.rfid.value){
      this.cardStatusColor = this.failedStatus;
      this.message = "Debe asignar una tarjeta de fichado al empleado" ;
      this.statusFail = true;
      this.rfid.setErrors({'invalid': true});
    }
    
    if (this.employeeForm.valid) {
      this.isLoading = !this.isLoading;
      this.subscriptions.add(
      this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/dashboard/empleados']);
          }
        }
      ));
    }
  }

  get enrollment(): AbstractControl {
    return this.employeeForm.get('enrollment');
  }

  get firstName(): AbstractControl {
    return this.employeeForm.get('profile').get('firstName');
  }

  get lastName(): AbstractControl {
    return this.employeeForm.get('profile').get('lastName');
  }

  get admissionDate(): AbstractControl {
    return this.employeeForm.get('profile').get('admissionDate');
  }
  get employer(): AbstractControl {
    return this.employeeForm.get('profile').get('employer');
  }

  get avatar(): AbstractControl {
    return this.employeeForm.get('profile').get('avatar');
  }

  get dni(): AbstractControl {
    return this.employeeForm.get('profile').get('dni');
  }

  get email(): AbstractControl {
    return this.employeeForm.get('contact').get('email');
  }

  get street(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('street');
  }

  get city(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('city');
  }

  get country(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('country');
  }

  get zip(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('zip');
  }

  get area(): AbstractControl {
    return this.employeeForm.get('contact').get('phone').get('area');
  }

  get line(): AbstractControl {
    return this.employeeForm.get('contact').get('phone').get('line');
  }

  get rfid(): AbstractControl {
    return this.employeeForm.get('rfid');
  }

  get phoneForms() {
    return this.employeeForm.get('contact').get('phones') as FormArray
  }
  
  get streetNumber(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('streetNumber');
  }
  get department(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('department');
  }
  get manz(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('manz');
  }
  get lote(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('lote');
  }
  get neighborhood(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('neighborhood');
  }
  get province(): AbstractControl {
    return this.employeeForm.get('contact').get('address').get('province');
  }

  addPhone(): void {
    const phone = this.fBuilder.group({
      area: ['', Validators.required],
      line: ['', Validators.required]
    });

    this.phoneForms.push(phone);
  }

  deletePhone(i) {
    this.phoneForms.removeAt(i);
  }

  resetCardId(): void{
    this.lastRfidValue = this.rfid.value;
    this.rfid.setValue('');
    this.rfidInput.nativeElement.focus();
  }

  cancelResetCardId(){
    this.rfid.setValue(this.lastRfidValue);
    this.rfid.setErrors({'invalid': false});
    this.lastRfidValue = undefined;
  }

  cardIconStatus(): void{
    this.isFocusIn = !this.isFocusIn;
    this.statusFail = false;
    if(this.isFocusIn){
      // focusin: cambiamos a color azul el icono para indicar que se debe ingresar la tarjeta
      this.cardStatusColor = this.focusinStatus;
      this.rfidInput.nativeElement.focus();
      this.lastRfidValue = this.rfid.value;
      this.rfid.setValue('');
      this.message = 'Por favor, coloque la tarjeta en el lector';
    } else{

      // estado success
      if(this.lastRfidValue || this.rfid.value){
        if(!this.rfid.value) this.rfid.setValue(this.lastRfidValue);

        this.lastRfidValue = null;
        this.cardStatusColor = this.successedStatus;
        this.message = `Id de tarjeta: ${this.rfid.value}` ;
      }else if(!this.rfid.value){
        // estado fail
        this.cardStatusColor = this.failedStatus;
        this.message = "Debe asignar una tarjeta de fichado al empleado" ;
        this.statusFail = true;
      }
    }
  }

  rfidChange(e){
    this.saveEmployeBtn.focus();
  }

}
