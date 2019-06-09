import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';
import { SharedModule } from '@shared/shared.module';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileService } from './services/profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart.service';
import { ProductPageComponent } from './pages/product-page/product-page.component';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    StoreComponent, 
    TopbarComponent, 
    ProductComponent, 
    NewArrivalsComponent, 
    HomeComponent,
    ProfileComponent,
    CartComponent,
    ProductPageComponent
  ],
  providers: [
    ProductService,
    ProfileService,
    CartService
  ]
})
export class StoreModule { }
