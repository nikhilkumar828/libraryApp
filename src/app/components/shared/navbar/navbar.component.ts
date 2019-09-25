import { Component, OnInit, Input, ChangeDetectorRef,AfterContentChecked } from '@angular/core';
import { NavLink } from 'src/app/model/NavLink';
import NavLinks from '../../../json/navbar.json';
import { AuthService } from 'src/app/services/auth.service.js';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed: boolean = true;
  appTitle: string = "LIBRARY APP";
  count = parseInt(localStorage.getItem('NotifCount'));
  beforeLoginNavbar: Array<NavLink> = [];
  afterLoginNavbar: Array<NavLink> = [];
  isLoggedIn: boolean = false;
  loginSubscription: Subscription;
  @Input() currentUser: any;
  @Input() userLoginStatus;

  constructor(private authService: AuthService,private notification : NotificationService, private cdr: ChangeDetectorRef) {
    NavLinks.beforeLoginNavbar.forEach(link => {
      this.beforeLoginNavbar.push(
        new NavLink(link.title, link.url, link.iconClass)
      );
    });

    

    console.log('count is ', this.count);

    NavLinks.afterLoginNavbar.forEach(link => {
      this.afterLoginNavbar.push(
        new NavLink(link.title, link.url, link.iconClass)
      );
 
    });

  }

  ngOnInit() {  
    this.notification.$total.subscribe( (value) => setTimeout(() => {
            //this.count = value;
            this.count = parseInt(localStorage.getItem('NotifCount'));
          }, 0)); 
  }

  ngAfterViewInit(){
    //your code to update the model

 }

}
