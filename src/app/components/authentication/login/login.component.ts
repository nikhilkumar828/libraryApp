import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertError } from 'src/app/model/AlertError';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('card', { static: false }) element: ElementRef;
  loginForm: FormGroup;
  showError: boolean = false;
  errorData: AlertError;
  marginTop;
  
  constructor(private renderer: Renderer2, private authService: AuthService, private router: Router, public modal: NgbModal) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null , [Validators.required, Validators.email]),
      'password': new FormControl(null , Validators.required),
    });
  }

  ngAfterViewInit(): void {
    this.marginTop = (window.innerHeight - 32)  / 2 - this.element.nativeElement.offsetHeight / 2 - window.innerHeight * 0.05;
    this.renderer.setStyle(this.element.nativeElement, 'margin-top', `${this.marginTop}px`);
  }

  async login() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return this.showAlert("alert-danger", "Fill the form properly", 2000);
    }
    
    const response = await this.authService.login(this.loginForm.value);

    if(response.hasOwnProperty('message'))
      this.showAlert("alert-danger", response.message, 2000);
    else {
      await this.showAlert("alert-success", "Login Succeed !", 1000);
      this.authService.loginSubject.next(true);
      // this.router.navigate(['/notification']);
      this.modal.open(NotificationComponent); 
    }
    return true;
  }

  delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(this), time);
    });
  }

  showAlert(className: string, message: string, time: number) {
    this.showError = true;
    this.errorData = new AlertError(className, message);
    return this.delay(time).then(() => {
      this.showError = false;
      this.errorData = null;
    });
  }
}
