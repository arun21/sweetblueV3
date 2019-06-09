import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTags() {
    return this.http.get(`${this.apiBaseUrl}/user/tags`);
  }

  getFilters() {
    return this.http.get(`${this.apiBaseUrl}/user/filters`);
  }

  confirmEmail(ct: string) {
    return this.http.post(`${this.apiBaseUrl}/user/email/confirm`, { ct: ct });
  }

  registerUser(user) {
    return this.http.post(`${this.apiBaseUrl}/user/register`, user);
  }
}
