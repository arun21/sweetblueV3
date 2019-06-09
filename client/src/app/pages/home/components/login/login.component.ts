import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AnimationService } from '@core/services/animation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomHttpError } from '@core/interceptors/error.interceptor';
import { AlertService } from '@core/services/alert.service';
import { UserService } from '@home/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private activeRoute: ActivatedRoute,
    private animationService: AnimationService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params['ct']) {
        this.sendEmailConfirmationToken(params['ct']);
      }
    });
  }

  getCssClasses(field: string) {
    const control = this.loginForm.get(field);
    return {
      'is-valid': control.valid && control.touched,
      'is-invalid': !control.valid && control.touched
    };
  }

  onLoginSubmit() {
    if (!this.loginForm.valid) {
      return this.alertService.showErrorAlert('Fill all required fields');
    }
    
    this.animationService.showSpinner();
    this.authService.login(this.loginForm.value)
      .subscribe(
        () => {
          this.animationService.hideSpinner();
          this.alertService.showSuccessAlert('You are now logged in');
          this.router.navigateByUrl('/store');
        },
        (err: CustomHttpError) => {
          this.animationService.hideSpinner();
          this.alertService.showErrorAlert(err.message);
        }
      );
  }

  sendEmailConfirmationToken(ct: string) {
    this.userService.confirmEmail(ct)
      .subscribe(
        () => {
          this.animationService.hideSpinner();
          this.alertService.showSuccessAlert('Email address verified.');
        },
        (err: CustomHttpError) => {
          this.animationService.hideSpinner();
          this.alertService.showErrorAlert(err.message);
        }
      );
  }

}
