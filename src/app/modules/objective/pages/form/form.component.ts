import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ObjectiveService } from '@shared/services/objective.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IDefaultSchedule, IObjective } from '@shared/models/objective';
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

  private subscriptions: Subscription = new Subscription();
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
    serviceType: this.fBuilder.array([
      this.fBuilder.group({
        name: [""],
        hours: [""]
      })
    ]),
    defaultSchedules: this.fBuilder.array([
      this.fBuilder.group({
        fromTime: this.fBuilder.group({
          hour: [""],
          minute: [""]
        }),
        toTime: this.fBuilder.group({
          hour: [""],
          minute: [""]
        }),
        color: this.fBuilder.control(new Color(255, 255, 0, 1), [Validators.required]),
        name: [""]
      }) 
    ]),
    description: [''],
    avatar: [''],
    identifier: ['', Validators.required],
    password: ['']
  });

  constructor(
    private fBuilder: FormBuilder,
    private objectiveService: ObjectiveService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.initObjectiveForm();
    
    this.activatedRoute.data.subscribe( data => {
      if(data.objective){
        this.isEdit = true;
        console.log(data.objective.defaultSchedules);
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
          color: this.fBuilder.control(new Color(schedule.color.r, schedule.color.g, schedule.color.b, schedule.color.a), [Validators.required]),
          name: schedule.name
        })       
      );
    });
    return formArray;
  }

  // Create objective
  saveClickEvent(): void {
    if (this.objectiveForm.valid) {
      this.isLoading = true;
      this.subscriptions.add(
        this.objectiveService.addObjective(this.objectiveForm.value).subscribe(
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
      ));
    }
  }

  // update objective
  updateClickEvent(): void {
    // if (this.objectiveForm.valid) {
      console.log(this.objectiveForm.value);
      this.isLoading = true;
      this.subscriptions.add(
        this.objectiveService.updateObjective(this.objectiveForm.value).subscribe(
          success => {
            if (success) {
              this.router.navigate(['/dashboard/objetivos']);
            }
            this.isLoading = false;
          },
          err => {
            this.isLoading = false;
            err.error.map((error: { property: string | (string | number)[]; message: any; }) => {
              this.objectiveForm.get(error.property).setErrors({ invalid: error.message});
            });
          }
      ));
    // }
  }

  get servicesTypeForms() {
    return this.objectiveForm.get('serviceType') as FormArray;
  }
  
  get defaultSchedulesForms() {
    return this.objectiveForm.get('defaultSchedules') as FormArray;
  }

  addService(): void {
    const service = this.fBuilder.group({
      name: ['', Validators.required],
      hours: ['', Validators.required]
    });

    this.servicesTypeForms.push(service);
  }

  deleteService(i) {
    this.servicesTypeForms.removeAt(i);
  }

  addSchedule(): void {
    const schedule = this.fBuilder.group({
      fromTime: this.fBuilder.group({
        hour: ['', Validators.required],
        minute: ['', Validators.required]
      }),
      toTime: this.fBuilder.group({
        hour: ['', Validators.required],
        minute: ['', Validators.required]
      }),
      color: this.fBuilder.control(new Color(255, 255, 0, 1), [Validators.required]),
      name: [""]
    });
    this.defaultSchedulesForms.push(schedule);
  }

  deleteSchedule(i) {
    this.defaultSchedulesForms.removeAt(i);
  }

}
