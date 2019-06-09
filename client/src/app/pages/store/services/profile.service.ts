import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class ProfileService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  getProfile(): Observable<any> {
    let user = this.authService.loadUser();
    
    if(user) {
      return Observable.create(observer => {
        observer.next(user);
      })
    } else {
      return this.http.get(`${this.apiBaseUrl}/users/profile`);
    }
    
  }
}
