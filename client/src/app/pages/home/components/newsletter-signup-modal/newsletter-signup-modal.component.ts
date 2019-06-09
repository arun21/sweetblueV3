import { Component, OnInit, Inject } from '@angular/core';
import { windowToken } from '@core/factories/window.provider';

@Component({
  selector: 'app-newsletter-signup-modal',
  templateUrl: './newsletter-signup-modal.component.html',
  styleUrls: ['./newsletter-signup-modal.component.less']
})
export class NewsletterSignupModalComponent implements OnInit {

  constructor(@Inject(windowToken) private window: any) {}

  ngOnInit() {
      this.window.setTimeout(this.showModal, 1000);
  }

  showModal() {
    this.window.$('#newsletterModal').modal()
  }

}
