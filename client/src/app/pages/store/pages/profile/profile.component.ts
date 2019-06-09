import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@store/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      profile => {
        this.user = profile;
      },
      err => this.user = null
    );
  }

}
