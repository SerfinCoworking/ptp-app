import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ObjectiveService } from '@shared/services/objective.service';
import { IObjective } from '@shared/models/objective';
import { PaginationResult } from '@shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesResolverService implements Resolve<PaginationResult<IObjective>> {

  constructor(private objectiveService: ObjectiveService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<IObjective>> | Promise<PaginationResult<IObjective>> | PaginationResult<IObjective>{
    return this.objectiveService.getObjectives();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ObjectiveResolverService implements Resolve<IObjective> {

  constructor(private objectiveService: ObjectiveService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IObjective> | Promise<IObjective> | IObjective{
    const { id, objectiveId } = route.params;
    const objId: string = id || objectiveId;
    return this.objectiveService.getObjective(objId);
  }
}
