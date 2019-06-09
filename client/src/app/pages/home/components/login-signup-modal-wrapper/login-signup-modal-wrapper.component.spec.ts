import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupModalWrapperComponent } from './login-signup-modal-wrapper.component';

describe('LoginSignupModalWrapperComponent', () => {
  let component: LoginSignupModalWrapperComponent;
  let fixture: ComponentFixture<LoginSignupModalWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSignupModalWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignupModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
