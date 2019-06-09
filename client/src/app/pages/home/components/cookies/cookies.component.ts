import { Component, OnInit, OnDestroy } from "@angular/core";
import { AnimationService } from "@core/services/animation.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-cookies",
  templateUrl: "./cookies.component.html",
  styleUrls: ["./cookies.component.less"]
})
export class CookiesComponent implements OnInit, OnDestroy {
  constructor(
    private animationService: AnimationService,
    private title: Title
  ) {
    this.title.setTitle("Cookies | Sweetblu - Simplicity in Healthy Living");
  }

  ngOnInit() {
    this.animationService.makeNavbarTransparent();
    this.animationService.makeNavbarFontLight();
  }

  ngOnDestroy() {
    this.animationService.makeNavbarSolid();
    this.animationService.makeNavbarFontDark();
  }
}
