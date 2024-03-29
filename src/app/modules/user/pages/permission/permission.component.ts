import { Component, OnInit } from '@angular/core';
import { faPen, faSpinner, faSave, faUserCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, IUserRole, IUserRolePermission } from '@shared/models/user';
import IRole, { IAction } from '@shared/models/role';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.sass']
})
export class PermissionComponent implements OnInit {

  permissionForm: FormGroup;
  user: IUser | null;
  roles: IRole[] | null;
  faPen = faPen;
  faSave = faSave;
  faUserCircle = faUserCircle;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  allComplete: Array<boolean> = [];

  constructor( private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.data.subscribe( data => {
      this.user = data.user;
      this.roles = this.sortActionsRole(data.roles.docs);
      this.editPermissions(data.user);
    });
  }

  // init employee form
  initForm() {
    this.permissionForm = this.fBuilder.group({
      _id: [],
      roles: this.fBuilder.array([
        this.fBuilder.group({
          name: [''],
          permissions: this.fBuilder.array([
            this.fBuilder.group({
              name: ['', Validators.required]
            })
          ])
        })
      ])
    });
  }

  // set employee DB values on the form
  editPermissions(user: IUser) {
    this.permissionForm.patchValue({
      _id: user._id
    });
    this.permissionForm.setControl('roles', this.setExistingRoles(user.roles));

    // mapeamos los permisos guardados del usuario con todas las acciones de cada rol
    user.roles.map((role: IUserRole) => {
      this.roles.map((roleList: IRole, index: number) => {
        roleList.actions.map((action: IAction) => {
          role.permissions.map((permission: IUserRolePermission) => {
            if( roleList.name === role.name && action.name === permission.name) {
              action.completed = true;
              this.updateAllComplete(roleList, index);
            }
          });
        });
      });
    });
  }

  // set permissions array
  setExistingRoles(roles: IUserRole[]): FormArray {
    const formArray = new FormArray([]);
    roles.forEach( role => {
      const formArrayPermissions = new FormArray([]);
      role.permissions.forEach( permission => {
        formArrayPermissions.push(
          this.fBuilder.group({
            name: permission.name
          })
        );
      });
      formArray.push(
        this.fBuilder.group({
          name: role.name,
          permissions: formArrayPermissions
        })
      );
    });
    return formArray;
  }

  get rolesForms() {
    return this.permissionForm.get('roles') as FormArray;
  }

  addPermission(role: IRole, actionIndex?: number): void {

    if(!this.rolesForms.value.some(rol => rol.name == role.name)){
      const roleGroup = this.fBuilder.group({
        name: [role.name],
        permissions: this.fBuilder.array([])
      });
      this.rolesForms.push(roleGroup);
    }

    this.rolesForms.controls.forEach((element: FormGroup) => {
      if(role.name === element.get('name').value){
        const permissions = element.get('permissions') as FormArray;
        if(typeof actionIndex !== 'undefined'){
          const permissionGroup = this.fBuilder.group({
            name: [role.actions[actionIndex].name]
          });
          permissions.push(permissionGroup);
        }else{
          role.actions.forEach((action: IAction) => {
            if(typeof permissions === null || !permissions.value.some(per => per.name == action.name)){
              const permissionGroup = this.fBuilder.group({
                name: [action.name]
              });
              permissions.push(permissionGroup);
            }
          });
        }
      }
    });
    console.log(this.rolesForms.controls);
  }

  deletePermission(role: IRole, actionIndex?: number) {
    this.rolesForms.controls.forEach((element: FormGroup, roleIndex: number) => {
      if(role.name === element.get('name').value){
        const permissions = element.get('permissions') as FormArray;
        permissions.controls.forEach((permission: FormGroup, index: number) => {
          if(typeof actionIndex !== 'undefined' && role.actions[actionIndex].name === permission.get('name').value){
            permissions.removeAt(index);
          }
        });
        if(typeof actionIndex === 'undefined'){
          this.rolesForms.removeAt(roleIndex);
        }
      }
    });
    console.log(this.rolesForms.controls);
  }


  submitForm(): void {
    
    if (this.permissionForm.valid) {
      this.isLoading = !this.isLoading;
      this.userService.updatePermissions(this.permissionForm.value).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/dashboard/usuarios']);
          }
        }
      );
    }
  }

  

  updateAllComplete(role: IRole, roleIndex: number, actionIndex?: number) {
    this.allComplete[roleIndex] = role.actions != null && role.actions.every(t => t.completed);
    if(typeof actionIndex !== 'undefined' && role.actions[actionIndex].completed){
      this.addPermission(role, actionIndex);
    }else if(typeof actionIndex !== 'undefined'){
      this.deletePermission(role, actionIndex);
    }
  }
  
  someComplete(role: IRole, roleIndex: number): boolean {
    if (role.actions == null) {
      return false;
    }
    return role.actions.filter(t => t.completed).length > 0 && !this.allComplete[roleIndex];
  }
  
  setAll(completed: boolean, role: IRole, roleIndex: number) {
    this.allComplete[roleIndex] = completed;
    if (role.actions == null) {
      return;
    }
    role.actions.forEach(t => t.completed = completed);
    completed ? this.addPermission(role) : this.deletePermission(role);
  }

  private sortActionsRole(roles: Array<IRole>): Array<IRole>{
    const sortedActions: Array<IRole> = roles.map((role: IRole) => {
      role.actions.sort( (a, b) => {
        if(a.nameDisplay < b.nameDisplay) { return -1; }
        if(a.nameDisplay > b.nameDisplay) { return 1; }
        return 0;

      });
      return role;
    });
    return sortedActions;
  }
}
