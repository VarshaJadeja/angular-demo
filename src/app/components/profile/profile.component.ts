import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddProfileComponent } from '@components/add-profile/add-profile.component';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { EditProfileComponent } from '@components/edit-profile/edit-profile.component';
import { Userprofile } from '@models/userprofile.model';
import { UserProfileService } from '@services/user-profile.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  users: MatTableDataSource<Userprofile> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  // userdata: Userprofile[] = [];
  totalCount: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  sortField: string = '';
  isAscending: boolean = false;

  constructor(
    private userProfileService: UserProfileService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.getPaginatedUserData();
  }

  ngAfterViewInit() {
    this.users.sort = this.sort;
  }

  SortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(sortState.direction);
      console.log(sortState.active);
    } else {
      console.log(sortState.direction);
      console.log(sortState.active);
    }
  }

  getAllUser() {
    this.userProfileService
      .getAllUser()
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            this.users.data = response;
          },
          error: () => {
            console.log('error');
          },
        })
      )
      .subscribe();
  }

  getPaginatedUserData() {
    console.log(this.sortField);
    this.userProfileService
      .getPaginatedUser(this.currentPage, this.pageSize)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            this.users.data = response.users;
            this.totalCount = response.totalCount;
          },
          error: () => {
            console.log('error');
          },
        })
      )
      .subscribe();
  }

  OnPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getPaginatedUserData();
  }

  OpenAddDialog() {
    const dialogRef = this.dialogRef.open(AddProfileComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPaginatedUserData();
      }
    });
  }

  OpenEditDialog(user?: any) {
    const dialogRef = this.dialogRef.open(EditProfileComponent, {
      data: { ...user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPaginatedUserData();
        console.log('Dialog closed with result:', result);
      }
    });
  }

  OpenDeleteDialog(user: any) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
        this.userProfileService.deleteUser(user.id).subscribe(() => {
          this.getPaginatedUserData();
        });
      }
    });
  }
}
