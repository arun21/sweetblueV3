import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SignupBannerComponent } from './components/signup-banner/signup-banner.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PaginatorComponent,
    SignupBannerComponent
  ],
  exports: [
    PaginatorComponent,
    SignupBannerComponent
  ]
})
export class SharedModule { }
