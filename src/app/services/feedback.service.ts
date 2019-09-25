import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FeedbackComment } from '../model/FeedbackComment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  subject = new Subject();

  constructor() { }

  async postComment(username: string, rating: number, feedback: string) {
    return await fetch('https://library-fccj.herokuapp.com/feedback/add', {
      method: 'POST',
      body: JSON.stringify({
        username,
        rating,
        feedback
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      this.subject.next({ 
        'message': response, 
        'response': new FeedbackComment('ND', String(new Date()), 0, username, rating, feedback, false)
      });
      return response;
    });
  }

  getComments() {
    return fetch('https://library-fccj.herokuapp.com/feedback', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then((res) => {
      return res;
    });
  }
}
