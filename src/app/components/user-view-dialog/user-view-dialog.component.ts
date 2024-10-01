import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-view-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-view-dialog.component.html',
  styleUrl: './user-view-dialog.component.scss',
})
export class UserViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any // Define a proper interface for User
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
