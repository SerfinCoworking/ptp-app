import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { Injectable } from '@angular/core';
import IMovement from '@shared/models/movement';
import { PaginationResult } from '@shared/models/pagination';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { AuthService } from '@auth/services/auth.service';
import { IUser } from '@shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // LIST
  getMovements(search?: string, sort?: string, page?: number, limit?: number): Observable<PaginationResult<IMovement>>{
    let params = new HttpParams();
    if(typeof page !== 'undefined'){
      params = params.append('page', page.toString());
    }
    if(typeof limit !== 'undefined'){
      params = params.append('limit', limit.toString());
    }
    if(typeof search !== 'undefined'){
      params = params.append('search', search);
    }
    if(typeof sort !== 'undefined'){
      params = params.append('sort', sort);
    }

    return this.http.get<PaginationResult<IMovement>>(`${environment.API_END_POINT}/movements`, {params: params});
  }

}
