import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Storage } from '@core/services/storage.service';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userKey = 'id_user';
  private readonly tokenKey = 'id_token';
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private authToken: any;
  private user: any;
  private LogInNotifySubject = new ReplaySubject<boolean>();
  public LogInState = this.LogInNotifySubject.asObservable();

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.loadToken();
    this.LogInNotifySubject.next(false);
  }

  login(user): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/auth/login`, user)
      .pipe(
        map((authResponse: any) => {
          this.storeUserData(authResponse.token, authResponse.user);
          return authResponse;
        })
      );
  }

  forgotPassword(email) {
    return this.http.post(`${this.apiBaseUrl}/auth/password/forgot`, email);
  }

  resetPassword(newPassword) {
    return this.http.post(`${this.apiBaseUrl}/auth/password/reset`, newPassword);
  }

  storeUserData(token, user) {
    this.storage.setItem(this.tokenKey, token);
    this.storage.setItem(this.userKey, user);
    this.LogInNotifySubject.next(true);
    this.authToken = token;
    this.user = user;
  }

  loadToken(): string {
    const token = this.storage.getItem(this.tokenKey);
    if (this.checkIfTokenValid(token)) {
      this.authToken = token;
      return token.jwt;
    } else {
      this.authToken = null;
      return null;
    }
  }

  loadUser(): any {
    this.user = this.storage.getItem(this.userKey);
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.checkIfTokenValid(this.authToken);
  }

  checkIfTokenValid(token: any): boolean {
    let isTokenValid = false;

    if (token && token.expires) {
      let expires = new Date(token.expires);
      if (expires > new Date()) {
        isTokenValid = true;
      }
    }
    this.LogInNotifySubject.next(isTokenValid);
    return isTokenValid;
  }

  logout() {
    this.LogInNotifySubject.next(false);
    this.authToken = null;
    this.user = null;
    this.storage.removeItem(this.tokenKey);
    this.storage.removeItem(this.userKey);
  }

}
