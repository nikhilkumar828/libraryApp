import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { FilterContentPipe } from './components/dashboard/filter-content.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/shared/alert/alert.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ReservationDashboardComponent } from './components/Reservation/reservation-dashboard/reservation-dashboard.component';
import { ReservebookComponent } from './components/Reservation/reservebook/reservebook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FilterContentPipe,
    AuthenticationComponent,
    LoginComponent,
    AlertComponent,
    NavbarComponent,
    ReservationDashboardComponent,
    ReservebookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
