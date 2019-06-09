import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@core/services/auth.service';
import { ReplaySubject, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CustomHttpError } from '@core/interceptors/error.interceptor';
import { AlertService } from '@core/services/alert.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CartService {
  private readonly baseUrl = `${environment.apiBaseUrl}/cart`;
  private cartItems: any[];
  private cart = new ReplaySubject<any[]>();
  public cartState = this.cart.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.updateCartItems([]);
    this.refreshCart();
  }

  refreshCart() {
    const user = this.authService.loadUser();
    this.http.get(`${this.baseUrl}/${user.id}`).subscribe(
      (cartItems: any) => this.updateCartItems(cartItems),
      (err: CustomHttpError) => this.alertService.showErrorAlert(err.message)
    )
  }

  addItemToCart(items: any): Observable<any> {
    const user = this.authService.loadUser();
    return this.http.put(`${this.baseUrl}/${user.id}`, items).pipe(
      tap((cartItems) => this.updateCartItems(cartItems))
    );
  }

  removeItemFromCart(itemId: string): Observable<any> {
    const user = this.authService.loadUser();
    return this.http.delete(`${this.baseUrl}/${user.id}/${itemId}`).pipe(
      tap(() => this.updateCartItems(this.cartItems.filter(item => item._id != itemId)))
    );
  }

  private updateCartItems(items) {
    this.cartItems = items;
    this.cart.next(items);
  }
}
