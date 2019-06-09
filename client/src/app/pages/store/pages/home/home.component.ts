import { Component, OnInit } from '@angular/core';
import { AnimationService } from '@core/services/animation.service';
import { AlertService } from '@core/services/alert.service';
import { ProductService } from '@store/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CustomHttpError } from '@core/interceptors/error.interceptor';
import { CartService } from '@store/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public products = [];
  public currentPage = 1;
  public totalPages = 10;
  public searchQuery: string;

  constructor(
    private animationService: AnimationService,
    private alertService: AlertService,
    private productService: ProductService,
    private currentRoute: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.currentRoute.queryParams.subscribe(
      params => {
        this.currentPage = params.page ? parseInt(params.page) : 1;
        this.searchQuery = params.q ? params.q : null;
        this.getProducts();
      }
    )
  }

  getProducts() {
    this.animationService.showSpinner();
    this.productService.getProducts(this.currentPage, this.searchQuery)
      .subscribe(
        res => {
          this.products = res.products;
          this.totalPages = res.totalPages;
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

}
