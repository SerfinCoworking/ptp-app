import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators, FormGroupDirective } from '@angular/forms';
import { EmployeeService } from '@dashboard/services/employee.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployee } from '@interfaces/employee';
import { IPhone } from '@interfaces/embedded.documents';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.sass']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription;
  employeeForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.initEmployeeForm();

    // get param id on edit
    const { id } = this.activatedRoute.snapshot.params;
    if(id){
      this.subscriptions.add(
        this.employeeService.getEmployee(id).subscribe(
          success => {
            if(success)
            this.employeeService.employee.subscribe(
              employee => {
                this.isEdit = true;
                this.editEmployee(employee);
              })
        }));
    }
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  // init employee form
  initEmployeeForm(){
    this.employeeForm = this.fBuilder.group({
      _id: [''],
      enrollment: ['', Validators.required],
      profile: this.fBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        avatar: [''],
        dni: ['', Validators.required]
      }),
      contact: this.fBuilder.group({
        email: ['', Validators.required],
        address: this.fBuilder.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
          zip: ['', Validators.required]
        }),
        phones: this.fBuilder.array([])
      })
    });
  }

  // set employee DB values on the form
  editEmployee(employee: IEmployee){
    this.employeeForm.patchValue({
      _id: employee._id,
      enrollment: employee.enrollment,
      profile: employee.profile,
      contact: employee.contact
    });
    const contact: FormGroup = this.employeeForm.get('contact') as FormGroup;
    contact.setControl('phones', this.setExistingPhones(employee.contact.phones));
  }

  // set phones array
  setExistingPhones(phoneSets: IPhone[]): FormArray{
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
    if(this.employeeForm.valid){
      this.subscriptions.add(
        this.employeeService.addEmployee(this.employeeForm.value).subscribe(
          success => {
            if(success){
              this.router.navigate(["/dashboard/empleados"]);
              // this.clearForm(employeeNgForm);
            }

          }
      ));
    }
  }

  // update employee
  updateClickEvent(employeeNgForm: FormGroupDirective): void {
    if(this.employeeForm.valid){
      this.subscriptions.add(
        this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
          success => {
            if(success){
              this.router.navigate(["/dashboard/empleados"]);
              // this.clearForm(employeeNgForm);
            }

          }
      ));
    }
  }

  // private clearForm(employeeNgForm: FormGroupDirective){
  //   employeeNgForm.resetForm();
  //   this.employeeForm.reset();
  // }


  get enrollment(): AbstractControl{
    return this.employeeForm.get('enrollment');
  }

  get firstName(): AbstractControl{
    return this.employeeForm.get('profile').get('firstName');
  }

  get lastName(): AbstractControl{
    return this.employeeForm.get('profile').get('lastName');
  }

  get avatar(): AbstractControl{
    return this.employeeForm.get('profile').get('avatar');
  }

  get dni(): AbstractControl{
    return this.employeeForm.get('profile').get('dni');
  }

  get email(): AbstractControl{
    return this.employeeForm.get('contact').get('email');
  }

  get street(): AbstractControl{
    return this.employeeForm.get('contact').get('address').get('street');
  }

  get city(): AbstractControl{
    return this.employeeForm.get('contact').get('address').get('city');
  }

  get country(): AbstractControl{
    return this.employeeForm.get('contact').get('address').get('country');
  }

  get zip(): AbstractControl{
    return this.employeeForm.get('contact').get('address').get('zip');
  }

  get area(): AbstractControl{
    return this.employeeForm.get('contact').get('phone').get('area');
  }

  get line(): AbstractControl{
    return this.employeeForm.get('contact').get('phone').get('line');
  }

  get phoneForms(){
    return this.employeeForm.get('contact').get('phones') as FormArray
  }

  addPhone(): void{
    const phone = this.fBuilder.group({
      area: [],
      line: []
    });

    this.phoneForms.push(phone);
  }

  deletePhone(i){
    this.phoneForms.removeAt(i);
  }

}
