import { Component, OnInit, Inject } from "@angular/core";
import { AnimationService } from "@core/services/animation.service";
import { delay } from "rxjs/operators";
import { asap } from "rxjs/internal/scheduler/asap";
import { Router, NavigationEnd } from "@angular/router";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  public isLoading: boolean;

  constructor(
    private animationService: AnimationService,
    private router: Router,
    private meta: Meta
  ) {
    this.meta.addTags([
      {
        name: "Sweetblu.",
        content:
          "A new way to be healthy. Live well, ethical sourcing, local products, the brands you know and love. Healthy living, modernized."
      },
      {
        name: "Cookies",
        content: "Cookies | Sweetblu. - Simplicity in Healthy Living"
      },
      {
        name: "Home",
        content: "Sweetblu. | Sweetblu. - Simplicity in Healthy Living"
      },
      {
        name: "Privacy",
        content: "Privacy | Sweetblu. - Simplicity in Healthy Living"
      },
      {
        name: "Terms of Service",
        content: "Terms of Service | Sweetblu. - Simplicity in Healthy Living"
      },
      {
        name: "About",
        content: "About | Sweetblu. - Simplicity in Healthy Living"
      }
    ]);
  }

  ngOnInit() {
    this.animationService.spinnerState.subscribe(isLoading =>
      asap.schedule(() => (this.isLoading = isLoading))
    );
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.animationService.addNavbarTransparentOnScrollEffect();
      }
    });
  }
}
