import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertError } from 'src/app/model/AlertError';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  errorData: AlertError;
  subscription: Subscription;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.subscription = this.feedbackService.subject.subscribe((data: { message, FeedbackComment }) => {
      let className = 'alert-success';
      if(data.message.substring('already')) {
        className = 'alert-danger';
      }
      this.errorData = new AlertError(className, data.message);
      setTimeout(() => {
        this.errorData = null;
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
