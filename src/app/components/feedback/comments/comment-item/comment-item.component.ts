import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FeedbackComment } from 'src/app/model/FeedbackComment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: FeedbackComment;
  date;

  constructor() { }

  ngOnInit() {
  }

  getDate(value) {
    return new Date(value).toLocaleString('en-US', { timeZone: 'Indian/Christmas' });
  }
}
