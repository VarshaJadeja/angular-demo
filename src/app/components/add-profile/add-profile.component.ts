import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfileService } from '@services/user-profile.service';

@Component({
  selector: 'app-add-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './add-profile.component.html',
  styleUrl: './add-profile.component.scss',
})
export class AddProfileComponent {
  addUserform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private dialogRef: MatDialogRef<AddProfileComponent>
  ) {}

  ngOnInit() {
    this.addUserform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  OnSave() {
    const credentials = {
      id: '',
      firstName: this.addUserform.get('firstName')?.value,
      lastName: this.addUserform.get('lastName')?.value,
      userName: this.addUserform.get('userName')?.value,
      email: this.addUserform.get('email')?.value,
      password: this.addUserform.get('password')?.value,
      profile:'',
    };
    if (this.addUserform.valid) {
      this.userProfileService.addUser(credentials).subscribe((response) => {
        this.dialogRef.close(response);
      });
    } else {
      this.addUserform.markAllAsTouched();
    }
  }

  OnCancel() {
    this.dialogRef.close();
  }
}
