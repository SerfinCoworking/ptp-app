import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormArray } from '@angular/forms';
import { ObjectiveService } from '@dashboard/services/objective.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IObjective } from '@interfaces/objective';
import { IServiceType } from '@interfaces/embedded.documents';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-objective-form',
  templateUrl: './objective-form.component.html',
  styleUrls: ['./objective-form.component.sass']
})
export class ObjectiveFormComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  objectiveForm: FormGroup;
  isEdit = false;
  hide: boolean = true;
  faSpinner = faSpinner;
  isLoading: boolean = false;

  constructor(
    private fBuilder: FormBuilder,
    private objectiveService: ObjectiveService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initObjectiveForm();

    // get param id on edit
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.subscriptions.add(
        this.objectiveService.getObjective(id).subscribe(
          objective => {
            this.isEdit = true;
            this.editObjective(objective);
        }));
    }else{
      const passwordControl = this.objectiveForm.get('password');
      passwordControl.setValidators([
        Validators.required,
        Validators.minLength(8)
      ]);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // init objective form
  initObjectiveForm() {
    this.objectiveForm = this.fBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      address: this.fBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      serviceType: this.fBuilder.array([]),
      description: [''],
      avatar: [''],
      identifier: ['', Validators.required],
      password: ['']
    });
  }

  // set objective DB values on the form
  editObjective(objective: IObjective) {
    this.objectiveForm.patchValue({
      _id: objective._id,
      name: objective.name,
      address: objective.address,
      serviceType: objective.serviceType,
      description: objective.description,
      avatar: objective.avatar,
      identifier: objective.identifier
    });
    const contact: FormGroup = this.objectiveForm as FormGroup;
    contact.setControl('serviceType', this.setExistingServices(objective.serviceType));
  }

  // set phones array
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
    if (this.objectiveForm.valid) {
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
    }
  }

  get name(): AbstractControl {
    return this.objectiveForm.get('name');
  }

  get description(): AbstractControl {
    return this.objectiveForm.get('description');
  }

  get street(): AbstractControl {
    return this.objectiveForm.get('address').get('street');
  }

  get city(): AbstractControl {
    return this.objectiveForm.get('address').get('city');
  }

  get zip(): AbstractControl {
    return this.objectiveForm.get('address').get('zip');
  }

  get servicesTypeForms() {
    return this.objectiveForm.get('serviceType') as FormArray;
  }

  get password(): AbstractControl{
    return this.objectiveForm.get('password');
  }

  get identifier(): AbstractControl{
    return this.objectiveForm.get('identifier');
  }

  get avatar(): AbstractControl{
    return this.objectiveForm.get('avatar');
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

}
