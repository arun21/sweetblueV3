import { Component, OnInit, OnDestroy } from "@angular/core";
import { AnimationService } from "@core/services/animation.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-privacy",
  templateUrl: "./privacy.component.html",
  styleUrls: ["./privacy.component.less"]
})
export class PrivacyComponent implements OnInit, OnDestroy {
  constructor(
    private animationService: AnimationService,
    private title: Title
  ) {
    this.title.setTitle("Privacy | Sweetblu - Simplicity in Healthy Living");
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
