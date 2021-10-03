import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEmployee } from '@shared/models/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {

  findEmployeeForm: FormGroup = this.fBuild.group({
    employee: ['']
  });

  filteredEmployees: Array<IEmployee> = [];

  constructor(private fBuild: FormBuilder) { }

  ngOnInit(): void {
    this.findEmployeeForm.valueChanges.subscribe((form) => {
      if(form.employee.length > 3){
        console.log(form);

      }
    });
  }

}
