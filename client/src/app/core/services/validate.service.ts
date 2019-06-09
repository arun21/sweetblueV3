import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.firstName === undefined
      || user.lastName === undefined
      || user.emailAddress === undefined
      || user.password === undefined
      || user.phoneNumber === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }
}
