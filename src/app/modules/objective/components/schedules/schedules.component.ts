import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from '@angular-material-components/color-picker';
import { faClock } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.sass']
})
export class SchedulesComponent implements OnInit {

  @Output() addScheduleEvent = new EventEmitter;

  faClock = faClock;

  scheduleForm: FormGroup = this.fBuilder.group({
    fromTime: this.fBuilder.group({
      hour: ['', Validators.required],
      minute: ['', Validators.required]
    }),
    toTime: this.fBuilder.group({
      hour: ['', Validators.required],
      minute: ['', Validators.required]
    }),
    color: this.fBuilder.control(new Color(255, 255, 0, 1), []),
    name: ["", Validators.required]
  });

  constructor(private fBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  isInValidSchedule(stField: string, field: string): boolean {
		return !!(
			this.scheduleForm.controls[stField].get(field).errors &&
			this.scheduleForm.controls[stField].get(field).touched
		);
	}
  
  isInValid(field: string): boolean {
		return !!(
			this.scheduleForm.controls[field].errors &&
			this.scheduleForm.controls[field].touched
		);
	}

  addSchedule(): void {
    if(this.scheduleForm.valid){
      this.addScheduleEvent.emit(this.scheduleForm.value);
      this.scheduleForm.reset({
        color: new Color(255, 255, 0, 1)
      });
    }else{
      this.scheduleForm.markAllAsTouched();
    }
  }

}
