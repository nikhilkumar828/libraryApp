import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { SearchService } from './components/dashboard/search.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatDialogModule } from '@angular/material';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/shared/alert/alert.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { ReservationDashboardComponent } from './components/Reservation/reservation-dashboard/reservation-dashboard.component';
import { ReservebookComponent } from './components/Reservation/reservebook/reservebook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { HistoryComponent } from './components/history/history.component';
import { LoaderComponent } from './components/dashboard/loader/loader.component';
import { ImageComponent } from './components/shared/image/image.component';
import { ForgetPasswordComponent } from './components/authentication/forget-password/forget-password.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { PostFeedbackComponent } from './components/feedback/post-feedback/post-feedback.component';
import { CommentsComponent } from './components/feedback/comments/comments.component';
import { CommentItemComponent } from './components/feedback/comments/comment-item/comment-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AuthenticationComponent,
    LoginComponent,
    AlertComponent,
    NavbarComponent,
    ReservationDashboardComponent,
    ReservebookComponent,
    AddbookComponent,
    NotificationComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    HistoryComponent,
    LoaderComponent,
    ImageComponent,
    ForgetPasswordComponent,
    DropdownDirective,
    FeedbackComponent,
    PostFeedbackComponent,
    CommentsComponent,
    CommentItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
