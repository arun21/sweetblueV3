import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { AnimationService } from "@core/services/animation.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomHttpError } from "@core/interceptors/error.interceptor";
import { AlertService } from "@core/services/alert.service";

@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.less"]
})
export class ForgotpasswordComponent implements OnInit {
  public forgotpasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private activeRoute: ActivatedRoute,
    private animationService: AnimationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.forgotpasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getCssClasses(field: string) {
    const control = this.forgotpasswordForm.get(field);
    return {
      "is-valid": control.valid && control.touched,
      "is-invalid": !control.valid && control.touched
    };
  }

  onForgotPasswordSubmit() {
    this.animationService.showSpinner();
    this.authService.forgotPassword(this.forgotpasswordForm.value).subscribe(
      (result) => {
        this.animationService.hideSpinner();
        this.alertService.showSuccessAlert(
          "An email has been sent to your registerested email."
        );
        this.router.navigate(["login"]);
      },
      (err: CustomHttpError) => {
        this.animationService.hideSpinner();
        this.alertService.showErrorAlert(err.message);
      }
    );
    this.animationService.hideSpinner();
  }
}
