import { Routes } from '@angular/router';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { LoginComponent } from '@components/login/login.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { RegisterComponent } from '@components/register/register.component';
import { AuthGuard } from '@guards/auth.guard';
import { UserdetailComponent } from '@components/userdetail/userdetail.component';
import { ChatComponent } from '@components/chat/chat.component';
import { MapComponent } from '@components/map/map.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'userdetail', component: UserdetailComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'map', component: MapComponent },
    ],
  },
];
