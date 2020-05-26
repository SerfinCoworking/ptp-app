import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@root/environments/environment';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import decode from 'jwt-decode';
// inteface
import { Tokens } from '@auth/models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly apiEndPoint = environment.API_END_POINT;
  private loggedIn: BehaviorSubject<boolean>;
  private userNameloggedIn: BehaviorSubject<string>;


  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn = new BehaviorSubject<boolean>(this.tokensExists());
    this.userNameloggedIn = new BehaviorSubject<string>(this.getLoggedUsername());
  }



  async load(): Promise<void>{
    if(this.tokensExists()){
      const resp = await this.http.get<any>(`${this.apiEndPoint}/auth/jwt-login`).pipe(
       tap(tokens => this.doLoginUser(tokens)),
       mapTo(true),
       catchError(async (error) => {
         const success = await this.logout().toPromise();
        if(success) this.router.navigate(['/auth/login']);
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
      'refreshToken': this.getRefreshToken()
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

  get isUserNameloggedIn() {
    return this.userNameloggedIn.asObservable();
  }

  refreshToken() {
    return this.http.post<any>(`${this.apiEndPoint}/auth/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap((tokens: Tokens) => {
        this.storeTokens(tokens);
      })
    );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getLoggedUsername(): string{
    const payLoadJwt: any = this.getDecodeJwt();
    return payLoadJwt.usrn;
  }

  getLoggedUserId(): string{
    const payLoadJwt: any = this.getDecodeJwt();
    return payLoadJwt.sub;
  }

  getLoggedRole(): string[]{
    const payLoadJwt: any = this.getDecodeJwt();
    return payLoadJwt.rl;
  }

  private getDecodeJwt(){
    if(!!this.getJwtToken()){
      const token = this.getJwtToken();
      const tokenPayload = decode(token);
      return tokenPayload;
    }
    return false;
  }

  private doLoginUser(tokens: Tokens) {
    this.storeTokens(tokens);
    this.userNameloggedIn.next(this.getLoggedUsername());
    this.loggedIn.next(this.tokensExists());
  }

  private doLogoutUser() {
    this.removeTokens();
    this.userNameloggedIn.next('');
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




