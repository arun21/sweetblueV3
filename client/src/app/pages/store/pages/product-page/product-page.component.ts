import { Component, OnInit } from '@angular/core';
import { ProductService } from '@store/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CustomHttpError } from '@core/interceptors/error.interceptor';
import { AlertService } from '@core/services/alert.service';
import { AnimationService } from '@core/services/animation.service';
import { CartService } from '@store/services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit {
  public product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private alertService: AlertService,
    private animationService: AnimationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.getProduct(params['productId'])
    )
  }

  getProduct(id: string) {
    this.animationService.showSpinner();
    this.productService.getProductById(id).subscribe(
      (product: any) => {
        this.product = product;
        this.animationService.hideSpinner();
      },
      (err: CustomHttpError) => {
        this.alertService.showErrorAlert(err.message);
        this.animationService.hideSpinner();
      }
    )
  }

  addItemToCart() {
    const items = [{
      product: this.product._id,
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

}
