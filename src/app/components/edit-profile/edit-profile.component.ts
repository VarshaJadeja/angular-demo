import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Userprofile } from '@models/userprofile.model';
import { UserProfileService } from '@services/user-profile.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public user: Userprofile,
    private userProfileService: UserProfileService
  ) {}

  OnSave(): void {
    this.userProfileService.updateUser(this.user.id, this.user).subscribe(()=>{
      this.dialogRef.close(this.user);
      console.log("update user");
    });
  }
  
  OnCancel(){
    this.dialogRef.close();
  }
}
