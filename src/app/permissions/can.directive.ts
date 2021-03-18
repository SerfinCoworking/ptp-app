import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { PermissionService } from '@permissions/services/permission.service';

@Directive({
  selector: '[appCan]'
})
export class CanDirective {

  private hasView = false;
  @Input() appCan: string[];

  constructor(private templateRef: TemplateRef<any>,
              private vcr: ViewContainerRef,
              private roleService: PermissionService) { }

  ngOnInit() {

    this.roleService.hasPermission(this.appCan[0], this.appCan[1], this.appCan[2]).then(
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
