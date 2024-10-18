import { CommonModule } from '@angular/common';
import { Component, VERSION } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Userprofile } from '@models/userprofile.model';
import { UserProfileService } from '@services/user-profile.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  selectedFile: File | null = null;
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

  ngOnInit() {
    this.getUserData();
  }
  name = 'Angular ' + VERSION.major;
  url: any = '';

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedFile = event.target.files[0];
      console.log(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target!.result;
      };
    }
  }

  public delete() {
    this.url = null;
    this.selectedFile = null;
    this.userProfileService
      .updateUser(this.user.id, this.user, this.selectedFile!)
      .pipe(
        tap({
          next: () => {
            console.log('account updated!');
          },
          error: () => {
            console.log('error occured');
          },
        })
      )
      .subscribe();
  }

  getUserData() {
    this.userProfileService.getUserById(this.user.id).subscribe((response) => {
      this.user = response;
      if (response.profile) {
        this.url = 'data:image/png;base64,' + response.profile;
      }
    });
  }
  OnSave() {
    this.userProfileService
      .updateUser(this.user.id, this.user, this.selectedFile!)
      .pipe(
        tap({
          next: () => {
            console.log('account updated!');
          },
          error: () => {
            console.log('error occured');
          },
        })
      )
      .subscribe();
  }
}
