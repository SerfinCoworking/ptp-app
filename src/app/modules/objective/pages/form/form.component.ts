import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ObjectiveService } from '@shared/services/objective.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IDefaultSchedule } from '@shared/models/objective';
import { IServiceType } from '@shared/models/embedded.documents';
import { faSpinner, faTrashAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Color } from '@angular-material-components/color-picker';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  isEdit = false;
  hide: boolean = true;
  faSpinner = faSpinner;
  faTrashAlt = faTrashAlt;
  faClock = faClock;
  faTasks = faTasks;
  isLoading: boolean = false;

  objectiveForm: FormGroup = this.fBuilder.group({
    _id: [''],
    name: ['', Validators.required],
    address: this.fBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    }),
    serviceType: this.fBuilder.array([]),
    defaultSchedules: this.fBuilder.array([]),
    description: [''],
    avatar: [''],
    identifier: ['', Validators.required]
  });

  servicesType: FormGroup = this.fBuilder.group({
    name: [""],
    hours: [""]
  });

  constructor(
    private fBuilder: FormBuilder,
    private objectiveService: ObjectiveService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.data.subscribe( data => {
      if(data.objective){
        console.log(data.objective);
        this.isEdit = true;
        this.objectiveForm.reset(data.objective)
        this.objectiveForm.setControl('serviceType', this.setExistingServices(data.objective.serviceType));
        this.objectiveForm.setControl('defaultSchedules', this.setExistingSchedules(data.objective.defaultSchedules));
      }else{
        const passwordControl = this.objectiveForm.get('password');
        passwordControl.setValidators([
          Validators.required,
          Validators.minLength(8)
        ]);
      }
    });
  }

  isInValid(field: string): boolean {
		return !!(
			this.objectiveForm.controls[field].errors &&
			this.objectiveForm.controls[field].touched
		);
	}
  
  isInValidAddress(field: string): boolean {
		return !!(
			this.objectiveForm.controls['address'].get(field).errors &&
			this.objectiveForm.controls['address'].get(field).touched
		);
	}
  
  isInValidService(field: string): boolean {
		return !!(
			this.servicesType.controls[field].errors &&
			this.servicesType.controls[field].touched
		);
	}

  // set services array
  setExistingServices(services: IServiceType[]): FormArray {
    const formArray = new FormArray([]);
    services.forEach( service => {
      formArray.push(
        this.fBuilder.group({
          name: service.name,
          hours: service.hours
        })
      );
    });
    return formArray;
  }
  
  // set schedules array
  setExistingSchedules(schedules: IDefaultSchedule[]): FormArray {
    const formArray = new FormArray([]);
    schedules.forEach( schedule => {
      formArray.push(
        this.fBuilder.group({
          fromTime: this.fBuilder.group({
            hour: schedule.fromTime.hour,
            minute: schedule.fromTime.minute
          }),
          toTime: this.fBuilder.group({
            hour: schedule.toTime.hour,
            minute: schedule.toTime.minute
          }),
          color: this.fBuilder.control(new Color(schedule.color?.r || 255, schedule.color?.g || 255, schedule.color?.b || 255, schedule.color?.a || 1), [Validators.required]),
          name: schedule.name
        })       
      );
    });
    return formArray;
  }

  // Submit form
  onSubmit(): void {
    if (!this.objectiveForm.valid){
      this.objectiveForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.objectiveService.createOrUpdate(this.objectiveForm.value).subscribe(
      success => {
        if (success) {
          this.isLoading = false;
          this.router.navigate(['/dashboard/objetivos']);
        }
      },
      err => {
        this.isLoading = false;
        err.error.map((error: { property: string | (string | number)[]; message: any; }) => {
          this.objectiveForm.get(error.property).setErrors({ invalid: error.message});
        });
      }
    );
  }

  get servicesTypeForms() {
    return this.objectiveForm.get('serviceType') as FormArray;
  }
  
  get defaultSchedulesForms() {
    return this.objectiveForm.get('defaultSchedules') as FormArray;
  }

  addService(): void {  
    this.servicesTypeForms.push(this.fBuilder.group(this.servicesType.value));
    this.servicesType.reset();
  }

  deleteService(i) {
    this.servicesTypeForms.removeAt(i);
  }

  addSchedule(schedule): void {
    
    this.defaultSchedulesForms.push(
      this.fBuilder.group({
        fromTime: this.fBuilder.group({
          hour: schedule.fromTime.hour,
          minute: schedule.fromTime.minute
        }),
        toTime: this.fBuilder.group({
          hour: schedule.toTime.hour,
          minute: schedule.toTime.minute
        }),
        color: this.fBuilder.control(new Color(schedule.color.r, schedule.color.g, schedule.color.b, schedule.color.a), [Validators.required]),
        name: schedule.name
      }) 
    );
  }

  deleteSchedule(i) {
    this.defaultSchedulesForms.removeAt(i);
  }

}
