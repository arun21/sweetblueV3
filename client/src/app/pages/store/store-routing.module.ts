import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { HomeComponent } from './pages/home/home.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

const storeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'newarrivals',
    component: NewArrivalsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'product/:productId',
    component: ProductPageComponent
  },
  {
    path: '',
    redirectTo: 'home'
  }
]

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: storeRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
