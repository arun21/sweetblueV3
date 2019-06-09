import { Component, OnInit } from '@angular/core';
import { AnimationService } from '@core/services/animation.service';
import { AlertService } from '@core/services/alert.service';
import { ProductService } from '@store/services/product.service';
import { CustomHttpError } from '@core/interceptors/error.interceptor';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { CartService } from '@store/services/cart.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.less']
})
export class NewArrivalsComponent implements OnInit {
  public products = [];
  public isLoggedIn: Observable<boolean>;

  constructor(
    private animationService: AnimationService,
    private alertService: AlertService,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.getNewArrivals();
    this.isLoggedIn = this.authService.LogInState;
  }

  getNewArrivals() {
    this.animationService.showSpinner();
    this.productService.getNewArrivals()
      .subscribe(
        res => {
          this.products = res;
          this.animationService.hideSpinner();
        },
        (err: CustomHttpError) => {
          this.animationService.hideSpinner();
          this.alertService.showErrorAlert(err.message);
        }
      );
  }

  addProductToCart(productId: any) {
    const items = [{
      product: productId,
      quantity: 1
    }];
    this.animationService.showSpinner();
    this.cartService.addItemToCart(items).subscribe(
      () => {
        this.animationService.hideSpinner();
        this.alertService.showInfoAlert('Product added to cart');
      },
      (err: CustomHttpError) => {
        this.animationService.hideSpinner();
        this.alertService.showErrorAlert(err.message);
      }
    );
  }

  getFilteredProducts(startIndex, endIndex) {
    return this.products.filter((v, i) => i >=startIndex && i < endIndex);
  }

}
