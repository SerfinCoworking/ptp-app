import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IObjective } from '@interfaces/objective';
import { IEmployee } from '@interfaces/employee';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { MatSelectChange } from '@angular/material/select/select';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.sass']
})
export class ScheduleFormComponent implements OnInit {

  @ViewChild('stepper', {static: true}) stepper: MatHorizontalStepper;
  objectiveList: IObjective[] = [];
  employeeList: IEmployee[] = [];
  saveObjectiveId: string;
  selectedPeriod: {fromDate: string, toDate: string} = {fromDate: '', toDate: ''};
  selectedEmployees: IEmployee[] = [];

  faSpinner = faSpinner;
  isLoading: boolean = false;

  objectiveForm: FormGroup;

  constructor(private fBuilder: FormBuilder, private scheduleService: ScheduleService) {}

  ngOnInit() {
    // get objectives and employees list
    this.scheduleService.newRecord().subscribe(
      res => {
        this.objectiveList = res.objectives;
        this.employeeList = res.employees;
      }
    );

    this.objectiveForm = this.fBuilder.group({
      objective: ['', Validators.required]
    });
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

  validateObjectiveAndNextStep(){

    if(this.objectiveForm.valid && this.saveObjectiveId != this.objective.value._id){
      this.isLoading = true;
      this.scheduleService.create(this.objective.value).subscribe((res) => {
        this.saveObjectiveId = this.objective.value._id;
        this.isLoading = false;
        this.stepper.next();
      });
    }else if(this.saveObjectiveId === this.objective.value._id){
      this.stepper.next();
    }
  }

  validatePeriodAndNextStep(){
    this.isLoading = true;
    this.scheduleService.createPeriod(this.objective.value, this.selectedPeriod.fromDate, this.selectedPeriod.toDate).subscribe(
      res => {
        this.isLoading = false;
        this.stepper.next();
      }
    )
    console.log("in next step", this.stepper);
  }

  get objective(): AbstractControl{
    return this.objectiveForm.get('objective');
  }
}
