import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelper {

  constructor() { }

  getCssClasses(form: FormGroup, field: string) {
    try {
      const control = form.get(field);
      return {
        'is-valid': control.valid && control.touched,
        'is-invalid': !control.valid && control.touched
      };
    } catch (err) {
      return {};
    }
  }

  getErrors(form: FormGroup, field: string) {
    try {
      return form.get(field).errors;
    } catch (err) {
      return undefined;
    }
  }

  validateAllFields(form: any) {
    try {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFields(control);
        }
      });
    } catch (err) { }
  }
}
