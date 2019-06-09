import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CustomHttpError } from '@core/interceptors/error.interceptor';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { AnimationService } from '@core/services/animation.service';
import { UserService } from '@home/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormHelper } from '@core/services/form-helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public formStage = 1; // Default = 1
  public tags = [];
  private destroyed$ = new Subject<void>();
  public filters = [];
  public validationError: string;

  constructor(
    private alertService: AlertService,
    private animationService: AnimationService,
    private router: Router,
    private userService: UserService,
    public formHelper: FormHelper
  ) { }

  ngOnInit() {
    this.getAllTags();
    this.getAllFilters();
    this.initRegisterFormGroup();
  }

  onRegisterSubmit() {
    if (!this.validateRegisterForm()) {
      this.formHelper.validateAllFields(this.registerForm);
    } else {
      this.validationError = '';
      this.postRegisterFormData();
    }
  }

  postRegisterFormData() {
    this.animationService.showSpinner();
    this.userService.registerUser(this.getFormData())
      .subscribe(
        (data: any) => {
          this.animationService.hideSpinner();
          this.alertService.showSuccessAlert('Registered Successfully');
          this.router.navigate(['/'], { queryParams: { m: 'signin' } });
        },
        (err: CustomHttpError) => {
          this.animationService.hideSpinner();
          this.alertService.showErrorAlert(err.message);
        }
      );
  }

  getAllTags() {
    this.userService.getTags()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (tags: any) => this.tags = tags,
        () => this.tags = []
      );
  }

  getAllFilters() {
    this.userService.getFilters()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (filters: any) => this.filters = filters,
        () => this.filters = []
      );
  }

  validateFormSection(formGroupName: string) {
    const formGroup = this.registerForm.get(formGroupName);
    if (!formGroup.valid) {
      this.formHelper.validateAllFields(formGroup);
    } else {
      this.formStage++;
    }
  }

  validateCheckedTags() {
    const checkedTags = this.tags.filter(t => t.isChecked);
    if (checkedTags.length < 3) {
      this.validationError = 'tags';
    } else {
      this.formStage++;
      this.validationError = '';
    }
  }

  getSortedFilters() {
    const checked = this.filters.filter(f => f.isChecked);
    const unchecked = this.filters.filter(f => !f.isChecked);

    this.filters = checked.concat(unchecked);
    return this.filters;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.filters, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private validateRegisterForm(): boolean {
    let isValid = true;
    const checkedTags = this.tags.filter(t => t.isChecked);
    const checkedFilters = this.filters.filter(f => f.isChecked);
    if (!this.registerForm.get('firstStage').valid) {
      isValid = false;
      this.formStage = 1;
    } else if (!this.registerForm.get('secondStage').valid) {
      isValid = false;
      this.formStage = 2;
    } else if (checkedTags.length < 3) {
      isValid = false;
      this.validationError = 'tags';
      this.formStage = 3;
    } else if (checkedFilters.length < 3) {
      isValid = false;
      this.validationError = 'filters';
      this.formStage = 4;
    }

    return isValid;
  }

  private getFormData() {
    return {
      ...this.registerForm.get('firstStage').value,
      ...this.registerForm.get('secondStage').value,
      tags: this.tags.filter(t => t.isChecked).map(t => t._id),
      filters: this.filters.filter(filter =>
        filter.isChecked
      ).map((filter, index) => {
        return { id: filter._id, order: index + 1 };
      })
    }
  }

  private initRegisterFormGroup() {
    this.registerForm = new FormGroup({
      firstStage: new FormGroup({
        emailAddress: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl(''),
      }, { validators: this.validatePassword }),
      secondStage: new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required])
      }),
    }, { updateOn: 'blur' });
  }

  private validatePassword(c: AbstractControl) {
    const pwd = c.get('password');
    const confirmPwd = c.get('confirmPassword');
    if (pwd.value !== confirmPwd.value) {
      confirmPwd.setErrors({ MatchPassword: true })
    } else {
      return undefined;
    }
  }

}
