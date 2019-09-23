import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RouterLink, Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  books = [ ];
  index: any;

  searchedBook = [  ];

  private selectedBook = new BehaviorSubject<object>({});
  private userBooks = new BehaviorSubject<object>({});
  constructor(private router: Router, private modal: NgbModal ) { }

  // tslint:disable-next-line: ban-types
  async getReservedBooks() {
    const  user = JSON.parse(localStorage.getItem('user'));
    await fetch('/catalog/rentid/' + user._id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then((response) => {
      let userIndex = 0;
      if (response.length !== 0) {
      for (const element of response) {
      userIndex = this.getIndexOfUser(element);
      console.log('user Index' + userIndex);
      element.currentUserIndex = userIndex;
      }
    }
      this.userBooks.next(response);
    });
  }

  getIndexOfUser(response) {
    this.index = 0;
    const  user = JSON.parse(localStorage.getItem('user'));
    for (const element of response.rentedBy) {
      if (element.ownerID !== user._id) {
        this.index++;
      } else {
        break;
      }
    }
    return this.index;
}

  getReservedBooksOfUser() {
    return this.userBooks.asObservable();
  }
  // tslint:disable-next-line: ban-types
   async returnReservedBook(id: String) {
    const  user = JSON.parse(localStorage.getItem('user'));
    console.log(id);
    await fetch('/catalog/release', {
      method: 'POST',
      body: JSON.stringify({
        bookID: id,
        ownerID: user._id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
    });
    this.getReservedBooks();
  }

  reserveBook(book: object) {
    this.selectedBook.next(book);
    this.router.navigate(['reserveBook']);
  }

  getBookToReserve() {
    return this.selectedBook.asObservable();
  }

  async searchBookByISBN(isbn: string) {
    await fetch('/catalog/search', {
      method: 'POST',
      body: JSON.stringify({
        key: 'isbn',
        value: isbn
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      this.searchedBook = response;
    });

    if ( this.searchedBook.length > 0 && this.searchedBook[0].isbn === isbn) {
      if ( (this.searchedBook[0].quantity - this.searchedBook[0].rentedCount)) {
         this.reserveBook(this.searchedBook[0]);
      } else {
        const modalRef = this.modal.open(NotificationComponent, { centered: true });
        modalRef.componentInstance.option = 'already';
      }
    } else {
      const modalRef = this.modal.open(NotificationComponent, { centered: true });
      modalRef.componentInstance.option = 'wrong';
      // alert('Book with ISBN not Found.');
    }
  }

  async reserveBookCall(book: object) {
    const diffInMs: number = Date.parse(book[0].returnDate) - Date.parse(book[0].issueDate);
    const days = diffInMs / (1000 * 3600 * 24);
    console.log('here');
    console.log(book[0]._id);
    const  user = JSON.parse(localStorage.getItem('user'));
    let reserved = false;
    const rentedUsers = book[0].rentedBy;
    rentedUsers.forEach( element => {
      if (element.ownerID === user._id) {
        reserved = true;
      }
    });
    if (!reserved) {
    await fetch('/catalog/rent', {
      method: 'POST',
      body: JSON.stringify({
        bookID: book[0]._id,
        ownerID: user._id,
        startDate: book[0].issueDate,
        daysToRent: days
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      const modalRef = this.modal.open(NotificationComponent, { centered: true });
      modalRef.componentInstance.option = 'reserve';
      this.router.navigate(['reserveDashboard']);
    });
  } else {
      const modalRef = this.modal.open(NotificationComponent, { centered: true });
      modalRef.componentInstance.option = 'reservedBySameUser';
      // alert('already reserved by you.');
  }
  }

}
