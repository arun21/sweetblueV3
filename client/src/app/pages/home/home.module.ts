import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NewsletterSignupModalComponent } from './components/newsletter-signup-modal/newsletter-signup-modal.component';
import { HomePageCarouselComponent } from './components/home-page-carousel/home-page-carousel.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { MissionstatementComponent } from './components/missionstatement/missionstatement.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ValuesComponent } from './components/values/values.component';
import { SharedModule } from '@shared/shared.module';
import { LoginSignupModalWrapperComponent } from './components/login-signup-modal-wrapper/login-signup-modal-wrapper.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AboutComponent } from "./components/about/about.component";
import { TermsNavComponent } from "./components/terms-nav/terms-nav.component";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  declarations: [
    HomeComponent,
    CookiesComponent,
    MissionstatementComponent,
    PrivacyComponent,
    ValuesComponent,
    LoginComponent,
    RegisterComponent,
    NewsletterSignupModalComponent,
    HomePageCarouselComponent,
    AboutComponent,
    LoginSignupModalWrapperComponent,
    TermsNavComponent
  ],
  providers: [UserService]
})
export class HomeModule {}
