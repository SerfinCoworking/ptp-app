import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { IObjective } from '@interfaces/objective';
import { IEmployee } from '@interfaces/employee';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { StepperSelectionEvent } from '@angular/cdk/stepper/stepper';
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
  selectedObjective: IObjective;
  saveObjectiveId: string;
  selectedPeriod: {fromDate: string, toDate: string} = {fromDate: '', toDate: ''};
  selectedEmployees: IEmployee[] = [];

  faSpinner = faSpinner;
  isLoading: boolean = false;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    // get objectives and employees list
    this.scheduleService.newRecord().subscribe(
      res => {
        this.objectiveList = res.objectives;
        this.employeeList = res.employees;
      }
    );
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

  validateObjectiveAndNextStep(){
    if(this.selectedObjective._id != this.saveObjectiveId){
      this.isLoading = true;
      this.scheduleService.create(this.selectedObjective).subscribe((res) => {
        this.saveObjectiveId = this.selectedObjective._id;
        this.isLoading = false;
        this.stepper.next();
      });
    }
  }

  validatePeriodAndNextStep(){
    // this.stepper.next();
    this.isLoading = true;
    console.log("in next step", this.stepper);
  }
}
