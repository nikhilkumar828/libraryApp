import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ReservationDashboardComponent } from './components/Reservation/reservation-dashboard/reservation-dashboard.component';
import { ReservebookComponent } from './components/Reservation/reservebook/reservebook.component';
import { AuthGuard } from './services/auth-guard.service';
import { SearchComponent } from './components/dashboard/search/search.component';
import { NotificationComponent } from './components/notification/notification.component';
import { Test1Component } from './components/test1/test1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'prefix'
  },
  { 
    path: 'auth', 
    component: AuthenticationComponent, 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  { 
    path: 'reserveDashboard', 
    component: ReservationDashboardComponent,
    canActivate: [ AuthGuard ]
  },
  { 
    path: 'reserveBook', 
    component: ReservebookComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'logout',
    component: LoginComponent,
    canActivate: [ AuthGuard ]
  },
  { 
    path: 'dashboard',
    component: SearchComponent,
    canActivate: [ AuthGuard ]
  },
  { path:'n', 
    component:NotificationComponent,
    canActivate: [ AuthGuard ]
  },
  { path:'notification', 
    component: Test1Component,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
