import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormArray } from '@angular/forms';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { IObjective } from '@interfaces/objective';
import { IEmployee } from '@interfaces/employee';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.sass']
})
export class ScheduleFormComponent implements OnInit {
  isLinear = false;
  objectiveFormGroup: FormGroup;
  periodFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  objectiveList: IObjective[] = [];
  employeeList: IEmployee[] = [];

  constructor(private _formBuilder: FormBuilder, private scheduleService: ScheduleService) {}

  ngOnInit() {

    this.scheduleService.newRecord().subscribe(
      res => {
        console.log(res);
        this.objectiveList = res.objectives;
        this.employeeList = res.employees;
        console.log(this.objectiveList, this.employeeList);
      }
    );


    this.objectiveFormGroup = this._formBuilder.group({
      objective: ['', Validators.required]
    });
    this.periodFormGroup = this._formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


  get objective(): AbstractControl{
    return this.objectiveFormGroup.get('objective');
  }

  get fromDate(): AbstractControl{
    return this.periodFormGroup.get('fromDate');
  }

  get toDate(): AbstractControl{
    return this.periodFormGroup.get('toDate');
  }

  displayObjectiveFn(objective: IObjective): string {
    return objective && objective.name ? objective.name : '';
  }
}
