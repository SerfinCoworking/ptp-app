import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ObjectiveService } from '@dashboard/services/objective.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveResolverService implements Resolve<boolean> {

  constructor(private objectiveService: ObjectiveService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    return this.objectiveService.getObjectives();
  }
}
