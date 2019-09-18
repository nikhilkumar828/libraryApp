import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ReservationDashboardComponent } from './components/Reservation/reservation-dashboard/reservation-dashboard.component';
import { ReservebookComponent } from './components/Reservation/reservebook/reservebook.component';
import { SearchComponent } from './components/dashboard/search/search.component';


const routes: Routes = [
  { path: 'auth', 
    component: AuthenticationComponent, 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path:'dashboard',
    component:SearchComponent
  },
  { path: 'reserveDashboard', component: ReservationDashboardComponent },
  { path: 'reserveBook', component: ReservebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
