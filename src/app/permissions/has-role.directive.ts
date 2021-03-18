import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from './services/permission.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  private hasView = false;
  @Input() appHasRole: string[];

  constructor(private templateRef: TemplateRef<any>,
              private vcr: ViewContainerRef,
              private roleService: PermissionService) { }

  ngOnInit() {

    this.roleService.hasRole([this.appHasRole[0]], this.appHasRole[1]  === 'exclude').then(
      permit => {
        if (permit && !this.hasView) {
          this.vcr.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!permit && this.hasView) {
          this.vcr.clear();
          this.hasView = false;
        }
    });
  }

}
