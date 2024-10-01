import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { UserdetailService } from '@services/userdetail.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-add-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-add-dialog.component.html',
  styleUrl: './user-add-dialog.component.scss',
})
export class UserAddDialogComponent {
  user: any;
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserAddDialogComponent>,
    private userDetailService: UserdetailService,
    public fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', [Validators.required]],
      title: ['', [Validators.required]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const credentials = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      jobTitle: this.userForm.get('jobTitle')?.value,
      title: this.userForm.get('title')?.value,
    };
    if (this.userForm.valid) {
      this.userDetailService.addUser(credentials).subscribe(() => {
        this.dialogRef.close(this.user);
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
