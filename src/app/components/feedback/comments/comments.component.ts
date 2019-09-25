import { Component, OnInit } from '@angular/core';
import { FeedbackComment } from 'src/app/model/FeedbackComment';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AlertError } from 'src/app/model/AlertError';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: FeedbackComment[] = [];
  showLoader = true;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbackService.getComments().then((data) => {
      this.comments = data;
      this.comments.reverse();
      this.showLoader = false;
    });

    this.feedbackService.subject.subscribe((data: { response, FeedbackComment }) => {
      this.comments.unshift(data.response);
    });
  }
}
