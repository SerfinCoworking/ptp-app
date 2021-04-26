import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { faIdCardAlt, faUserCircle, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import IRole, { IAction } from '@interfaces/role';
import { RoleService } from '@shared/services/role.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})


export class FormComponent implements OnInit, OnDestroy {
  
  
  private subscriptions: Subscription = new Subscription();
  roleForm: FormGroup;
  isEdit = false;
  faIdCardAlt = faIdCardAlt;
  faUserCircle = faUserCircle;
  faSpinner = faSpinner;
  faTrashAlt = faTrashAlt;
  isFocusIn: boolean = false;
  isLoading: boolean = false;
  lastRfidValue: number | null;
  role: IRole;



  constructor(
    private fBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.data.subscribe( data => {
      if(data.role){
        this.isEdit = true;
        this.role = data.role;
        this.editRole(data.role);
      }
    });    
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // init employee form
  initForm() {
    this.roleForm = this.fBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      nameDisplay: ['', Validators.required],
      actions: this.fBuilder.array([])
    });
  }

  // set employee DB values on the form
  editRole(role: IRole) {
    this.roleForm.patchValue({
      _id: role._id,
      name: role.name,
      nameDisplay: role.nameDisplay
    });
    this.roleForm.setControl('actions', this.setExistingActions(role.actions));
  }

  // set phones array
  setExistingActions(actions: IAction[]): FormArray {
    const formArray = new FormArray([]);
    actions.forEach( action => {
      formArray.push(
        this.fBuilder.group({
          name: action.name,
          nameDisplay: action.nameDisplay,
          observation: action.observation
        })
      );
    });
    return formArray;
  }

  // Create employee
  saveClickEvent(): void {

    if (this.roleForm.valid) {
      this.isLoading = !this.isLoading;
      this.subscriptions.add(
      this.roleService.addRole(this.roleForm.value).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/dashboard/roles']);
          }
        }
      ));
    }
  }
      
  // update employee
  updateClickEvent(): void {
    
    if (this.roleForm.valid) {
      this.isLoading = !this.isLoading;
      this.subscriptions.add(
      this.roleService.updateRole(this.roleForm.value).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/dashboard/roles']);
          }
        }
      ));
    }
  }
 
  get name(): AbstractControl {
    return this.roleForm.get('name');
  }
  get nameDisplay(): AbstractControl {
    return this.roleForm.get('nameDisplay');
  }
  get actionForms() {
    return this.roleForm.get('actions') as FormArray
  }

  addAction(): void {
    const action = this.fBuilder.group({
      name: ['', Validators.required],
      nameDisplay: ['', Validators.required],
      observation: [''],
    });

    this.actionForms.push(action);
  }

  deleteAction(i) {
    this.actionForms.removeAt(i);
  }
}
