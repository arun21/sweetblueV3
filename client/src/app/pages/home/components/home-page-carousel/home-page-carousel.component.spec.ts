import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageCarouselComponent } from './home-page-carousel.component';

describe('HomePageCarouselComponent', () => {
  let component: HomePageCarouselComponent;
  let fixture: ComponentFixture<HomePageCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
