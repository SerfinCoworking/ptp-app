import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateService } from '@shared/services/template.service';
import { ITemplate } from '@interfaces/template';
import { PaginationResult } from '@interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class TemplatesResolverService implements Resolve<PaginationResult<ITemplate>> {

  constructor(private templateService: TemplateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<ITemplate>> | Promise<PaginationResult<ITemplate>> | PaginationResult<ITemplate> {
    return this.templateService.getTemplates();
  }
}

@Injectable({
  providedIn: 'root'
})
export class TemplateResolverService implements Resolve<ITemplate | null> {

  constructor(private templateService: TemplateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITemplate | null> | Promise<ITemplate | null> | ITemplate | null {
    const { id } = route.params;
    return id ? this.templateService.getTemplate(id) : null;
  }
}
