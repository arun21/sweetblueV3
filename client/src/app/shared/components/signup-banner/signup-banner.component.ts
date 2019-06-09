import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signup-banner',
  templateUrl: './signup-banner.component.html',
  styleUrls: ['./signup-banner.component.less']
})
export class SignupBannerComponent implements OnInit {
  @Input() text: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
