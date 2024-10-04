import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@models/user.model';
import { UserdetailService } from '@services/userdetail.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ScrollingModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  users: MatTableDataSource<User> = new MatTableDataSource();
  totalCount: number = 0;
  pageSize: number = 100;
  currentPage: number = 1;
  searchTerm: string = '';
  sortField: string = '';
  isAscending: boolean = true;
  // user = Array.from({ length: 1000 }).map((_, i) => `User #${i + 1}`);
  constructor(
    private userService: UserdetailService,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  ngAfterViewInit(): void {
    this.viewport.elementScrolled().subscribe(() => {
      this.logVisibleItems();
    });
  }

  private logVisibleItems(): void {
    const startIndex = this.viewport.getRenderedRange().start;
    const endIndex = this.viewport.getRenderedRange().end;
    const visibleItems = this.users.data.slice(startIndex, endIndex);
    
    console.log('Visible Items:', visibleItems);
  }
  
  
  fetchUsers(): void {
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
          console.log(this.users.data)
          console.log('Rendered Range:', this.viewport.getRenderedRange());
        },
        (error) => console.error('Error fetching user data', error)
      );
  }
}
