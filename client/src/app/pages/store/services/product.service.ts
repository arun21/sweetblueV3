import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  private baseUrl = `${environment.apiBaseUrl}/product`;

  constructor(private http: HttpClient) { }

  getProducts(page = 0, query): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    if (query) {
      params = params.set('q', query);
    }

    return this.http.get(this.baseUrl, { params: params });
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getNewArrivals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/newarrivals`);
  }
}
