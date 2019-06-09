import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MissionstatementComponent } from "./components/missionstatement/missionstatement.component";
import { ValuesComponent } from "./components/values/values.component";
import { CookiesComponent } from "./components/cookies/cookies.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { TermsNavComponent } from './components/terms-nav/terms-nav.component';
import { AboutComponent } from "./components/about/about.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "mission", component: MissionstatementComponent },
  { path: "values", component: ValuesComponent },
  { path: "cookies", component: CookiesComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "about", component: AboutComponent },
  { path: "terms", component: TermsNavComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
