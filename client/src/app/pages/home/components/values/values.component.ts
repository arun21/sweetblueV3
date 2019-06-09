import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { AnimationService } from "@core/services/animation.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-values",
  templateUrl: "./values.component.html",
  styleUrls: ["./values.component.less"]
})
export class ValuesComponent implements OnInit, OnDestroy {
  constructor(
    private animationService: AnimationService,
    private title: Title
  ) {
    this.title.setTitle(
      "Terms of Service | Sweetblu - Simplicity in Healthy Living"
    );
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
