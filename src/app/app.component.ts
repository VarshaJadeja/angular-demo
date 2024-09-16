import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('sidebar', {static: false}) sidebar!:SidebarComponent;
  title = 'angular_sidebar_demo';

  isCollapsed = false;
  isMobile = false; 

  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    // Observe screen size changes
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
      console.log(this.isMobile);
    });
  }
  toggleSidebar() {
    if (this.isMobile) {
      this.isCollapsed = this.isMobile;
      this.sidebar.toggleMobileMenu();
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
