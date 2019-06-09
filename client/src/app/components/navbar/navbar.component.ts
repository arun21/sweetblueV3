import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { asap } from 'rxjs/internal/scheduler/asap';
import { takeUntil } from 'rxjs/operators';
import { windowToken } from '@core/factories/window.provider';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isSideNavbarOpen: boolean;
  public isLoggedIn: boolean;
  private destroyed$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    @Inject(windowToken) private window: any
  ) {
    this.isSideNavbarOpen = false;
    this.authService.LogInState
      .pipe(takeUntil(this.destroyed$))
      .subscribe(isLoggedIn =>
        asap.schedule(() => this.isLoggedIn = isLoggedIn)
      );
  }

  ngOnInit() {
    let $ = this.window.$;
    $('.nav-link,.content-main').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.alertService.showSuccessAlert('You are logged out');
    this.router.navigate(['/'], { queryParams: { m: 'signin' } });
    return false;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
