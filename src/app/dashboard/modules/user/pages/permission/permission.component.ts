import { Component, OnInit } from '@angular/core';
import { faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { IUser, IUserRole, IUserRolePermission } from '@interfaces/user';
import IRole, { IAction } from '@interfaces/role';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  faSpinner = faSpinner;
  isLoading: boolean = false;
  allComplete: Array<boolean> = [];

  constructor( private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.data.subscribe( data => {
      this.user = data.user;
      this.roles = data.roles.docs;
      this.editPermissions(data.user);
      console.log(data.roles);
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

  addPermission(role: IRole, actionIndex: number): void {

    this.rolesForms.controls.forEach((element: FormGroup) => {
      console.log(role, element.get('name').value);
      if(role.name === element.get('name').value){
        const permissions = element.get('permissions') as FormArray;
        const permissionGroup = this.fBuilder.group({
          name: [role.actions[actionIndex].name]
        });
        permissions.push(permissionGroup);
      }

    });
    console.log(this.rolesForms.controls);
  }

  deletePermission(role: IRole, actionIndex: number) {
    this.rolesForms.controls.forEach((element: FormGroup) => {
      console.log(role, element.get('name').value);
      if(role.name === element.get('name').value){
        
        const permissions = element.get('permissions') as FormArray;
        permissions.controls.forEach((permission: FormGroup, index: number) => {
          console.log(role, actionIndex);
          if(role.actions[actionIndex].name === permission.get('name').value){
            
            permissions.removeAt(index);
          }
        });
      }
    });
    console.log(this.rolesForms.controls);
  }


  updateClickEvent(): void {
    
    // if (this.employeeForm.valid) {
    //   this.isLoading = !this.isLoading;
    //   this.subscriptions.add(
    //   this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
    //     success => {
    //       if (success) {
    //         this.router.navigate(['/dashboard/empleados']);
    //       }
    //     }
    //   ));
    // }
  }

  

  updateAllComplete(role: IRole, roleIndex: number, actionIndex?: number) {
    this.allComplete[roleIndex] = role.actions != null && role.actions.every(t => t.completed);
    if(actionIndex && role.actions[actionIndex].completed){
      this.addPermission(role, actionIndex);
    }else if(actionIndex){
      this.deletePermission(role, actionIndex);
      console.log('remove');
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
  }
}
