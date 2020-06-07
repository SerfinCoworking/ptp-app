import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators, FormGroupDirective } from '@angular/forms';
import { EmployeeService } from '@dashboard/services/employee.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.sass']
})
export class EmployeeFormComponent implements OnInit {
 employeeForm: FormGroup;


  constructor(
    private fBuilder: FormBuilder,
    private employeeService: EmployeeService
  ){}

  ngOnInit(): void {
    this.initEmployeeForm();
  }

  initEmployeeForm(){
    this.employeeForm = this.fBuilder.group({
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


  // Create patient if doesn't exist and create prescription
  onSubmitEmployeeForm(employeeNgForm: FormGroupDirective): void {

    if(this.employeeForm.valid){
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        success => {
          if(success){
            this.clearForm(employeeNgForm);
          }

        }
      );
    }
  }


  private clearForm(employeeNgForm: FormGroupDirective){
    employeeNgForm.resetForm();
    this.employeeForm.reset();
  }


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

  addPhone(){
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
