import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { windowToken } from '@core/factories/window.provider';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-signup-modal-wrapper',
  templateUrl: './login-signup-modal-wrapper.component.html',
  styleUrls: ['./login-signup-modal-wrapper.component.less']
})
export class LoginSignupModalWrapperComponent implements OnInit, OnDestroy {
  public modalState;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(windowToken) private window: any
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => this.initRouteListener(params['m'])
    );
  }

  initRouteListener(modelStateQueryParam) {
    const $ = this.window.$;
    if (modelStateQueryParam) {
      this.modalState = modelStateQueryParam;
      const $wrapperModal = $('#wrapperModal');
      $wrapperModal.modal();
      $wrapperModal.on('click', () => this.router.navigateByUrl('/'));
      $('.modal-dialog').on('click', e => e.stopPropagation());
      $('.modal-backdrop.show').css('background-color', '#ffffff');
    }
  }

  ngOnDestroy() {
    const $ = this.window.$;
    $('#wrapperModal').modal('hide');
  }

}
