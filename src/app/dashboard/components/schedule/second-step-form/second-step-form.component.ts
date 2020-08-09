import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IObjective } from '@interfaces/objective';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ScheduleService } from '@dashboard/services/schedule.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-second-step-form',
  templateUrl: './second-step-form.component.html',
  styleUrls: ['./second-step-form.component.sass']
})
export class SecondStepFormComponent implements OnInit {
  @Output() nextStepEvent = new EventEmitter();
  @Output() periodEvent = new EventEmitter();
  @Input() objective: IObjective | null;
  selectedPeriodFlag: {fromDate: string, toDate: string} = {fromDate: '', toDate: ''};
  isLoading: boolean = false;
  faEye = faEye;
  faSpinner = faSpinner;

  periodForm: FormGroup;
  constructor(private fBuild: FormBuilder, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.periodForm = this.fBuild.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  get fromDate(): AbstractControl{
    return this.periodForm.get('fromDate');
  }

  get toDate(): AbstractControl{
    return this.periodForm.get('toDate');
  }

  submitPeriodForm(){

    if(this.periodForm.valid && this.selectedPeriodFlag?.fromDate != this.fromDate.value.format("YYYY-MM-DD") && this.selectedPeriodFlag?.toDate != this.toDate.value.format("YYYY-MM-DD")){
        this.isLoading = true;
        this.scheduleService.createPeriod(this.objective, this.fromDate.value.format("YYYY-MM-DD"), this.toDate.value.format("YYYY-MM-DD")).subscribe(
          res => {
            this.isLoading = false;
            this.selectedPeriodFlag.fromDate = this.fromDate.value.format("YYYY-MM-DD");
            this.selectedPeriodFlag.toDate = this.toDate.value.format("YYYY-MM-DD");
            this.periodEvent.emit(res.period);
            this.nextStepEvent.emit();
          }
        );
    }else if( this.selectedPeriodFlag?.fromDate == this.fromDate.value.format("YYYY-MM-DD") && this.selectedPeriodFlag?.toDate == this.toDate.value.format("YYYY-MM-DD")){
      this.nextStepEvent.emit();
    }
  }

}
