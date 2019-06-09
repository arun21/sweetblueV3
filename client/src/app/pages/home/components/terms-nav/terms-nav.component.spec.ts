import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsNavComponent } from './terms-nav.component';

describe('TermsNavComponent', () => {
  let component: TermsNavComponent;
  let fixture: ComponentFixture<TermsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
