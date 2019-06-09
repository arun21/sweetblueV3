import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationService } from '@core/services/animation.service';

@Component({
  selector: 'app-missionstatement',
  templateUrl: './missionstatement.component.html',
  styleUrls: ['./missionstatement.component.less']
})
export class MissionstatementComponent implements OnInit, OnDestroy {


  constructor(
    private animationService:AnimationService
  ) { }

  ngOnInit() {
    this.animationService.makeNavbarFontLight();
  }

  ngOnDestroy() {
    this.animationService.makeNavbarFontDark();
  }

}
