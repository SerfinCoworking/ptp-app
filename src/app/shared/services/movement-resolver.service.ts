import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MovementService } from '@shared/services/movement.service';
import { PaginationResult } from '@interfaces/pagination';
import IMovement from '@interfaces/movement';

@Injectable({
  providedIn: 'root'
})
export class MovementsResolverService implements Resolve<PaginationResult<IMovement>> {

  constructor(private movementService: MovementService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<IMovement>> | Promise<PaginationResult<IMovement>> | PaginationResult<IMovement> {
    return this.movementService.getMovements();
  }
}

