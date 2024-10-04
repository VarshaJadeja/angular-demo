import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from '@models/user.model';
import { UserdetailService } from '@services/userdetail.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { UserEditDialogComponent } from '@components/user-edit-dialog/user-edit-dialog.component';
import { UserViewDialogComponent } from '@components/user-view-dialog/user-view-dialog.component';
import { UserAddDialogComponent } from '@components/user-add-dialog/user-add-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-userdetail',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginator,
    MatSort,
    MatSortModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.scss',
})
export class UserdetailComponent {
  users: MatTableDataSource<User> = new MatTableDataSource();
  totalCount: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  searchTerm: string = '';
  sortField: string = '';
  isAscending: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserdetailService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  private sortFieldMapping: { [key: string]: string } = {
    email: 'Email',
    firstName: 'FirstName',
    lastName: 'LastName',
    jobTitle: 'JobTitle',
    title: 'Title',
  };

  fetchUsers(): void {
    console.log(this.sort);
    if (this.sort) {
      this.sortField =
        this.sortFieldMapping[this.sort.active] || this.sortField;
      this.isAscending = this.sort.direction === 'asc' ? true : false;
      console.log('1 ', this.sortField);
    }
    this.userService
      .fetchUsers(
        this.currentPage,
        this.pageSize,
        this.searchTerm,
        this.sortField,
        this.isAscending
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.users.data = data.users;
          this.totalCount = data.totalCount;
          this.users.sort = this.sort;
          console.log('sort', this.users.sort);
        },
        (error) => console.error('Error fetching user data', error)
      );
  }

  onPageChange(event: PageEvent): void {
    this.sortField = '';
    this.sort.disabled;
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchUsers();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.fetchUsers();
  }

  openViewDialog(user: any): void {
    const dialogRef = this.dialog.open(UserViewDialogComponent, {
      width: '400px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
  }
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      width: '500px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchUsers();
      }
    });
  }
  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User updated:', result);
        this.fetchUsers();
      }
    });
  }

  confirmDelete(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.users.data = this.users.data.filter((u) => u.id !== user.id);
        });
      }
    });
  }
}
