import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"]
})
export class HomeComponent {
  public modalState;

  constructor(private title: Title) {
    this.title.setTitle("Sweetblu - Simplicity in Healthy Living");
  }
}
