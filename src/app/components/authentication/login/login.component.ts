import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertError } from 'src/app/model/AlertError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('card', { static: false }) element: ElementRef;
  loginForm: FormGroup;
  showError: boolean = false;
  errorData;
  
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
    });
  }

  ngAfterViewInit(): void {
    let margin = (window.innerHeight - 32)  / 2 - this.element.nativeElement.offsetHeight / 2;
    if(window.innerHeight < 768) 
      margin -= ( window.innerHeight * 0.05);
    this.renderer.setStyle(this.element.nativeElement, 'margin-top', `${margin}px`);
  }

  login() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return false;
    }
    if(this.loginForm.value['password'] === "0") {
      this.showError = true;
      this.errorData = new AlertError('alert-danger', 'Invalid Username or Password, Please try again.');

      return this.delay(2000).then(() => {
        this.showError = false;
        this.errorData = null;
      });
    }
    console.log(this.loginForm);
  }

  delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(this), time)
    });
 }
}
