import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserProfileService } from '@services/user-profile.service';
import { Userprofile } from '@models/userprofile.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  url: any = '';
  user: Userprofile = {
    id: localStorage.getItem('UserId')!,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    profile: '',
  };
  constructor(private userProfileService: UserProfileService) {}
  ngOnInit(){
    this.getUserData();
  }
  getUserData() {
    const userid = localStorage.getItem("UserId");
    this.userProfileService.getUserById(userid!).subscribe((response) => {
      this.user = response;
      if (response.profile) {
        this.url = 'data:image/png;base64,' + response.profile;
      }
    });
  }
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
