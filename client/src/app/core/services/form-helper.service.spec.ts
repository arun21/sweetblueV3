import { TestBed } from '@angular/core/testing';

import { FormHelper } from './form-helper.service';

describe('FormHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormHelper = TestBed.get(FormHelper);
    expect(service).toBeTruthy();
  });
});
