import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public total = new BehaviorSubject<number>(0);
  public $total = this.total.asObservable();

  constructor() { }
  async bookReservedEmail(bookName: any, dueDate: any) {
    const  user = JSON.parse(localStorage.getItem('user'));
    await fetch('/mail', {
      method: 'POST',
      body: JSON.stringify({
        id: user._id,
        subject: 'Successfully Reserved a Book',
        message: '<html>You have successfully reserved the book ' + bookName + ' and the return date is ' + dueDate + '.<br><br> Thank you, <br> Team Epam</html>'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json());
  }

  async bookReturnedEmail(bookName: any) {
    const  user = JSON.parse(localStorage.getItem('user'));
    await fetch('/mail', {
      method: 'POST',
      body: JSON.stringify({
        id: user._id,
        subject: 'Successfully Returned a Book',
        message: '<html>You have successfully returned the book ' + bookName + '.<br> <br> Thank you, <br> Team Epam</html>'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json());
  }

  setNotificationCount(count) {
    this.total.next(count);
  }

  

  async getNotificationCount(){
    return this.total.asObservable();
  }


}
