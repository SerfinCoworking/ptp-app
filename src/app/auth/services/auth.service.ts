import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
// import jwt_decode from 'jwt-decode';
import jwt_decode from "jwt-decode";

// inteface
import { Tokens } from '@auth/models/tokens';
import { IUser, IUserRole } from '@interfaces/user';
import { IObjective } from '@interfaces/objective';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly apiEndPoint = environment.API_END_POINT;
  private loggedIn: BehaviorSubject<boolean>;
  private _currentUser: BehaviorSubject<IUser | IObjective>;


  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn = new BehaviorSubject<boolean>(this.tokensExists());
    this._currentUser = new BehaviorSubject<IUser | IObjective>({} as IUser | IObjective);
  }

  async load(): Promise<void>{
    if(this.tokensExists()){
      const resp = await this.http.get<any>(`${this.apiEndPoint}/auth/jwt-login`).pipe(
       tap(tokens => this.doLoginUser(tokens)),
       mapTo(true),
       catchError(async (error) => {
         const success = await this.logout().toPromise();
         if (success) { this.router.navigate(['/auth/login']); }
         return of(false);
       })
       ).toPromise();
    }
  }

  login(user: { username: string, password: string }): Observable<boolean | HttpErrorResponse> {
    return this.http.post<any>(`${this.apiEndPoint}/auth/login`, user).pipe(
      tap(tokens => this.doLoginUser(tokens)),
      mapTo(true)
    );
  }

  logout() {
    return this.http.post<any>(`${this.apiEndPoint}/auth/logout`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  resetPassword(passwords: {oldPassword: string, newPassword: string}){
    return this.http.post<any>(`${this.apiEndPoint}/auth/reset-password`, passwords);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  refreshToken() {
    return this.http.post<any>(`${this.apiEndPoint}/auth/refresh`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap((tokens: Tokens) => {
        this.storeTokens(tokens);
      })
    );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getLoggedUsername(): string {
    const payLoadJwt: any = this.getDecodeJwt();
    return payLoadJwt.usrn;
  }

  get currentUserLoggedIn(): Observable<IUser | IObjective>{
      return this._currentUser.asObservable();
  }

  getLoggedUserId(): string {
    const payLoadJwt: any = this.getDecodeJwt();
    return payLoadJwt.sub;
  }

  getLoggedRoles(): Array<IUserRole> | IUserRole {
    const payLoadJwt: any = this.getDecodeJwt();
    return payLoadJwt.rl;
  }

  private getDecodeJwt() {
    if(!!this.getJwtToken()) {
      const token = this.getJwtToken();
      const tokenPayload = jwt_decode(token);
      return tokenPayload;
    }
    return false;
  }

  private doLoginUser(tokens: Tokens) {
    this.storeTokens(tokens);
    const payLoadJwt: any = this.getDecodeJwt();

    this.http.get<IUser | IObjective>(`${this.apiEndPoint}/auth/get-users/${payLoadJwt.sub}`).subscribe( (user : IUser | IObjective) => {
      this._currentUser.next(user);
    });

    this.loggedIn.next(this.tokensExists());
  }

  private doLogoutUser() {
    this.removeTokens();
    this._currentUser.next({} as IUser | IObjective);
    this.loggedIn.next(this.tokensExists());
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private tokensExists(): boolean {
    return (!!this.getJwtToken() && !!this.getRefreshToken());
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}




