import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  loginSubject = new BehaviorSubject(false);

  constructor(public router: Router) {
    if(this.isLoggedIn()) {
      this.loginSubject.next(true);
      this.router.navigate(['dashboard']);
    }
  }

  async login(loginData: { email: string, password: string } ) {
    return await fetch('https://library-fccj.herokuapp.com/users/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        username: loginData.email,
        password: loginData.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      if(!response.hasOwnProperty('message')) {
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    });
  }

  async logout() {
    localStorage.removeItem('user');
    this.loginSubject.next(false);
    this.router.navigate(['auth/login']);
  }

  isLoggedIn(): boolean {
    const  user = JSON.parse(localStorage.getItem('user'));
    user !== null ? this.user = user : this.user = null;
    return this.user !== null;
  }
}
