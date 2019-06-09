import { Injectable, Inject } from '@angular/core';
import { windowToken } from '@core/factories/window.provider';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private $: any;
  private spinnerSubject = new Subject<boolean>();
  public spinnerState = this.spinnerSubject.asObservable();

  constructor(@Inject(windowToken) private window: any) {
    this.$ = window.$;
  }

  showSpinner() {
    this.spinnerSubject.next(true);
  }

  hideSpinner() {
    this.spinnerSubject.next(false);
  }

  addNavbarTransparentOnScrollEffect() {
    let window = this.window;
    let $ = this.$;

    this.makeNavbarTransparent();

    $(window).on('scroll', () => {
      let scrollTop = $(window).scrollTop();
      if (scrollTop > 50) {
        $('#navbar-top').removeClass('transparent');
      }
      else {
        $('#navbar-top').addClass('transparent');
      }
    });
  }

  removeNavbarTransparentOnScrollEffect() {
    this.$(this.window).off('scroll');
    this.$('.content-main').removeClass('no-margin-top');
  }

  makeNavbarTransparent() {
    this.$('#navbar-top').addClass('transparent');
    this.$('.content-main').addClass('no-margin-top');
  }

  makeNavbarSolid() {
    this.$('#navbar-top').removeClass('transparent');
    this.$('.content-main').removeClass('no-margin-top');
  }

  makeNavbarFontLight() {
    this.$('#navbar-top').addClass('font-light');
  }

  makeNavbarFontDark() {
    this.$('#navbar-top').removeClass('font-light');
  }

}
