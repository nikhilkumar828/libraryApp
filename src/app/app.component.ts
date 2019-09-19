import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userLoginStatus: boolean = false;
  currentUser: any;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getLoggedInUser();

    this.authService.loginSubject.subscribe((status) => {
      this.userLoginStatus = status;
      this.currentUser = this.authService.getLoggedInUser();
    });
  }

  ngAfterViewInit(): void {
    fetch('/users/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'india',
        lastName: 'india',
        username: 'india@gmail.com',
        password: 'india'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(console.log)
    
    
  }
}
