import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.component.html',
  styleUrls: ['./post-feedback.component.css']
})
export class PostFeedbackComponent implements OnInit, AfterViewInit {
  feedback = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(250)]);
  allStars: NodeList;
  rating = 5;
  loggedInUser;

  constructor(private authSerivce: AuthService, private feedbackService: FeedbackService) {  }

  ngOnInit() { 
    this.loggedInUser = this.authSerivce.getLoggedInUser();
   }

  async postComment() {
    await this.feedbackService.postComment(this.loggedInUser.username, this.rating, this.feedback.value);
  }

  ngAfterViewInit(): void {
    this.allStars = document.querySelectorAll('.fa-star');

    this.allStars.forEach((element, index) => {
      element.addEventListener('click', (event) => {
        this.rating = index + 1;
      });
    });
  }

  clear() {
    this.feedback.setValue('');
    this.feedback.markAsUntouched();
  }
}
