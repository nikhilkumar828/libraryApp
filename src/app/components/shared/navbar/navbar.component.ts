import { Component, OnInit } from '@angular/core';
import { NavLink } from 'src/app/model/NavLink';
import NavLinks from '../../../json/navbar.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  appTitle: string = "Library Management";
  beforeLoginNavbar: Array<NavLink> = [];
  afterLoginNavbar: Array<NavLink> = [];
  
  constructor() {
    NavLinks.beforeLoginNavbar.map(link => {
      this.beforeLoginNavbar.push(
        new NavLink(link.title, link.url, link.iconClass)
      );
    });

    NavLinks.afterLoginNavbar.map(link => {
      this.afterLoginNavbar.push(
        new NavLink(link.title, link.url, link.iconClass)
      );
    });
  }

  ngOnInit() {
  }

}
