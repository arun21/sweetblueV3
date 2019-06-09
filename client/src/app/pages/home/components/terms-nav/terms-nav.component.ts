import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-terms-nav',
  templateUrl: './terms-nav.component.html',
  styleUrls: ['./terms-nav.component.less']
})
export class TermsNavComponent implements OnInit {
  @Input() activePrivacy: string;
  @Input() activeTerms: string;
  @Input() activeCookies: string;

  constructor() { }

  ngOnInit() {
  }

}
