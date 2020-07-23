import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormArray } from '@angular/forms';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { IObjective } from '@interfaces/objective';
import { IEmployee } from '@interfaces/employee';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { StepperSelectionEvent } from '@angular/cdk/stepper/stepper';
import { MatSelectChange } from '@angular/material/select/select';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.sass']
})
export class ScheduleFormComponent implements OnInit {
  isLinear = false;
  objectiveFormGroup: FormGroup;
  periodFormGroup: FormGroup;
  employeesFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  objectiveList: IObjective[] = [];
  employeeList: IEmployee[] = [];

  selectedObjective: IObjective;
  selectedPeriod: {fromDate: string, toDate: string} = {fromDate: '', toDate: ''};
  selectedEmployees: IEmployee[] = [];



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

    this.initForms();
  }

  initForms(): void {

    this.fourthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  stepperHandler(e: StepperSelectionEvent){
    switch (e.previouslySelectedIndex) {
      case 0:
        this.sendFirstStep();
        break;
      case 1:
        this.sendSecondStep();
        break;
      case 2:
        this.sendThirdStep();
        break;
      case 3:
        this.sendFourthStep();
        this.sendThirdStep();
        break;
    }

  }

  sendFirstStep():void{
    console.log("On saving process 'OBJECTIVE'");
  }
  sendSecondStep():void{
    console.log("On saving process 'PERIOD'");
  }
  sendThirdStep():void{
    console.log("On saving process 'EMPLOYEES'");
  }
  sendFourthStep():void{
    console.log("On saving process 'SHIFTS'");
  }


  selectedObjectiveHandler(e: MatSelectChange): void{
    this.selectedObjective = { _id: e.value._id, name: e.value.name} as IObjective;
  }

  selectedFromPeriodHandler(fromDate): void{
    this.selectedPeriod.fromDate = fromDate;
  }

  selectedToPeriodHandler(toDate): void{
    this.selectedPeriod.toDate = toDate;
  }

  selectEventHandler(e: MatSelectionListChange): void{
    this.selectedEmployees = e.source.selectedOptions.selected.map((option) => {
      return option.value;
    });
  }
}
