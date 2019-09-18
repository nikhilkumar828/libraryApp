import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userLoginStatus = false;
  constructor(private authService: AuthService) {
    this.authService.loginSubject.subscribe((data) => {
      this.userLoginStatus = data;
    });
    
    
  }

  ngAfterViewInit(): void {
  }
}
