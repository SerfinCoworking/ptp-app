import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IObjective } from '@interfaces/objective';
import { IEmployee } from '@interfaces/employee';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IPeriod } from '@interfaces/schedule';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.sass']
})
export class ScheduleFormComponent implements OnInit {

  @ViewChild('stepper', {static: true}) stepper: MatHorizontalStepper;
  objectiveList: IObjective[] = [];
  employeeList: IEmployee[] = [];
  period: IPeriod;

  objectiveForm: FormGroup;
  saveObjectiveFlag: IObjective;
  isLoading: boolean = false;
  isEdit: boolean = false;
  faSpinner = faSpinner;

  stepIndex: number = 0;


  constructor(private fBuilder: FormBuilder, private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    // get param id on edit
    const { id } = this.activatedRoute.snapshot.params;
    if(id){
      this.stepIndex = 3;
        this.scheduleService.getPeriod(id).subscribe(
          res => {
            this.period = res.period;
            this.isEdit = true;
        });
    }else{
    // get objectives and employees list
      this.scheduleService.newRecord().subscribe(
        res => {
          this.objectiveList = res.objectives;
          this.employeeList = res.employees;
      });
    }

    this.objectiveForm = this.fBuilder.group({
      objective: ['', Validators.required]
    });
  }

  validateObjectiveAndNextStep(){

    if(this.objectiveForm.valid && this.saveObjectiveFlag?._id != this.objective.value._id){
      this.isLoading = true;
      this.scheduleService.create(this.objective.value).subscribe((res) => {
        this.saveObjectiveFlag = this.objective.value;
        this.isLoading = false;
        this.stepper.next();
      });
    }else if(this.saveObjectiveFlag?._id === this.objective.value._id){
      this.stepper.next();
    }
  }

  setPeriod(e): void{
    this.period = e;
  }

  savePeriod(e: IPeriod){
    this.scheduleService.savePeriod(e).subscribe(
      res => console.log(res)
    );
  }


  get objective(): AbstractControl{
    return this.objectiveForm.get('objective');
  }
}
