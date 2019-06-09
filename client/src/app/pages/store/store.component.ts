import { Component, OnInit, Inject } from '@angular/core';
import { windowToken } from '@core/factories/window.provider';
import { asap } from 'rxjs/internal/scheduler/asap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less']
})
export class StoreComponent implements OnInit {
  public isSearchBoxVisible = false;
  public searchForm: FormGroup;
  public cartCount = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    @Inject(windowToken) private window: any
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchQuery: ['', [Validators.required]]
    });
    this.cartService.cartState.subscribe(
      cartItems => {
        this.cartCount = cartItems.length || 0;
      });
  }

  onSearchFormSubmit() {console.log();
    if(this.searchForm.valid) {
      this.router.navigate(
        ['store'],
        { queryParams: { q: this.searchForm.get('searchQuery').value } }
      );
    }
  }

  toggleSearchControl(isOpen = false) {
    const $ = this.window.$;
    this.isSearchBoxVisible = isOpen;
    if (this.isSearchBoxVisible) {
      asap.schedule(() => $('#search-box').focus(), 10);
    }
  }

}
