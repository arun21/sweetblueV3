import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { AnimationService } from "@core/services/animation.service";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { CustomHttpError } from "@core/interceptors/error.interceptor";
import { AlertService } from "@core/services/alert.service";

@Component({
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.less"]
})
export class ResetpasswordComponent implements OnInit {
  public resetpasswordForm: FormGroup;
  public userid: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private activeRoute: ActivatedRoute,
    private animationService: AnimationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.resetpasswordForm = this.fb.group({
      password: ['', Validators.required]
    });
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params["ct"]) {
        this.userid = params["ct"];
      }
    });
  }
  getCssClasses(field: string) {
    const control = this.resetpasswordForm.get(field);
    return {
      "is-valid": control.valid && control.touched,
      "is-invalid": !control.valid && control.touched
    };
  }

  onResetPasswordSubmit() {
    this.animationService.showSpinner();
    const obj = {
      userid: this.userid,
      newpassword: this.resetpasswordForm.value.password
    }
    this.authService.resetPassword(obj).subscribe(
      (result) => {
        this.animationService.hideSpinner();
        this.alertService.showSuccessAlert(
          "Password reset was successfull."
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
