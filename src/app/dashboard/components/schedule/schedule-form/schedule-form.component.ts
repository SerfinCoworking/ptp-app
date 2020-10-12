import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IObjective } from '@interfaces/objective';
import { IEmployee } from '@interfaces/employee';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IPeriod, IShift } from '@interfaces/schedule';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.sass']
})
export class ScheduleFormComponent implements OnInit {

  @ViewChild('stepper', {static: true}) stepper: MatHorizontalStepper;
  objectiveList: IObjective[] = [];
  employeeList: IEmployee[] = [];
  shifts: IShift[];
  period: IPeriod;
  periods: IPeriod[] = [];

  objectiveForm: FormGroup;
  saveObjectiveFlag: IObjective;
  selectedObjective: IObjective;
  isLoading: boolean = false;
  isEdit: boolean = false;
  faSpinner = faSpinner;

  stepIndex: number = 0;


  constructor(private fBuilder: FormBuilder, 
    private scheduleService: ScheduleService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {

    this.objectiveForm = this.fBuilder.group({
      objective: ['', Validators.required]
    });

    // get param id on edit
    const { id } = this.activatedRoute.snapshot.params;
    const { scheduleId } = this.activatedRoute.snapshot.queryParams;
    if(id){
      this.stepper.selectedIndex = 3;
      this.scheduleService.getPeriod(id).subscribe(
        res => {
          this.setPeriod(res);
          this.isEdit = true;
        });
    }else if(scheduleId){
      // on create new period for existance schedule
      this.stepper.selectedIndex = 1;
      this.scheduleService.getSchedule(scheduleId).subscribe((res) => {
        this.objectiveList = res.objectives;
        this.periods = res.periods;
        this.selectedObjective = res.schedule.objective;
        this.objective.setValue(res.schedule.objective._id);
      });
    }else{
      // get objectives and employees list
      this.scheduleService.newRecord().subscribe(
        res => {
          this.objectiveList = res;
      });
    }    
  }

  validateObjectiveAndNextStep(){

    if(this.objectiveForm.valid && this.saveObjectiveFlag != this.objective.value){
      this.isLoading = true;
      this.scheduleService.create(this.objective.value).subscribe((res) => {
        this.saveObjectiveFlag = this.objective.value;
        this.periods = res.periods;
        this.selectedObjective = res.schedule.objective;
        this.isLoading = false;
        this.stepper.next();
      });
    }else if(this.saveObjectiveFlag === this.objective.value){
      this.stepper.next();
    }
  }

  setPeriod(e): void{
    this.period = e.period;
    this.shifts = e.shifts;
  }

  savePeriod(e: IPeriod){
    this.scheduleService.updateShifts(e).subscribe(
      res => {
        this.router.navigate(['/dashboard/agendas']);
      }
    );
  }
  
  updatePeriodRange(e){
    console.log(e);
    this.scheduleService.updatePeriod(e.periodId, e.fromDate, e.toDate).subscribe(
      res => {
        this.setPeriod(res);
      }
    );
  }


  get objective(): AbstractControl{
    return this.objectiveForm.get('objective');
  }

  nextStep(){
    this.stepper.linear = false;
    this.stepper.next();
    setTimeout(() => {
       this.stepper.linear = true;
    });
  }
  
  previousStep(){
    this.stepper.linear = false;
    this.stepper.previous();
    setTimeout(() => {
       this.stepper.linear = true;
    });
  }
}
