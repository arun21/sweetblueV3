import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '@store/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AnimationService } from '@core/services/animation.service';
import { AlertService } from '@core/services/alert.service';
import { CustomHttpError } from '@core/interceptors/error.interceptor';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit, OnDestroy {
  public cartItems: any[];
  public cartItemsCount: number;
  private destroyed$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private alertService: AlertService,
    private animationService: AnimationService
    ) { }

  ngOnInit() {
    this.cartService.cartState
    .pipe(takeUntil(this.destroyed$))
    .subscribe(
      items => {
        this.cartItemsCount = items.length ? items.length : 0;
        this.cartItems = items;
      }
    );
  }

  removeItemFromCart(itemId: string) {
    this.animationService.showSpinner();
    this.cartService.removeItemFromCart(itemId).subscribe(
      () => {
        this.animationService.hideSpinner();
        this.alertService.showInfoAlert('Product removed from cart successfully');
      },
      (err: CustomHttpError) => {
        this.animationService.hideSpinner();
        this.alertService.showErrorAlert(err.message);
      }
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
