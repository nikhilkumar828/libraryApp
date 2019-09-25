import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertError } from 'src/app/model/AlertError';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  
  @ViewChild('card', { static: false }) element: ElementRef;
  form: FormGroup;
  username: string;
  errorData: AlertError;
  code: string;
  marginTop: any;
  submitted: boolean = false;
  title: string = "Forgot Password";

  constructor(private activatedRoute: ActivatedRoute, 
              private renderer: Renderer2, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['username'] && params['code']) {
        this.username = params['username'];
        this.code = params['code'];
        this.title = "Change Password";
        this.form = new FormGroup({
          email: new FormControl(this.username, [Validators.required, Validators.email]),
          password: new FormControl("", [Validators.required, Validators.minLength(8)]),
          rePassword: new FormControl("",[Validators.required])
        });
        this.form.get('email').disable();
      }
      else{
        this.form = new FormGroup({
          email: new FormControl("", [Validators.required, Validators.email]),
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.marginTop = (window.innerHeight - 32)  / 2 - this.element.nativeElement.offsetHeight / 2 - window.innerHeight * 0.05 - 14;
    this.renderer.setStyle(this.element.nativeElement, 'margin-top', `${this.marginTop}px`);
  }

  async submitForm() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    this.submitted = true;
    if(this.title === "Forgot Password") {
      await this.authService.generateLink(this.form.get('email').value);    
      this.errorData = new AlertError("alert-success", "Link has been sent to your email !");
      await this.delay(10000);
      this.router.navigate(['/auth']);
    }
    else {
      const response = await this.authService.changePassword(this.username, this.form.get('password').value, this.code);   
      this.errorData = new AlertError("alert-success", response);
      await this.delay(2000);
      this.router.navigate(['/auth']);
    }
  }

  delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(this), time);
    });
  }
}
