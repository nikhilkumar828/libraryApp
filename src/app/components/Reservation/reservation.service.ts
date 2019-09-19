import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RouterLink, Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  books = [
    {
            imgURL : 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
            title : 'Book1' ,
            isbn : '1234',
            author : 'Huckle',
            // tslint:disable-next-line: max-line-length
            desc : 'Tempor veniam nostrud incididunt duis commodo minim ea consectetur ullamco eiusmod nostrud aliqua proident amet. Non nostrud consectetur consectetur in labore do adipisicing. Velit nostrud consequat sint adipisicing magna nostrud ut sunt elit quis. Sint adipisicing eiusmod culpa voluptate velit nostrud qui consectetur. Aute est adipisicing aliquip non occaecat voluptate minim commodo. Magna laborum aute excepteur occaecat deserunt magna sunt aute est deserunt. Veniam aliquip duis proident cillum.',
            releaseDate : 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) ',
            issueDate : 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) ',
            returnDate: 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) '
          }
  ];

  searchedBook = [
    {
            imgURL : 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
            title : 'Book2' ,
            isbn : '1234',
            author : 'Huckle123',
            // tslint:disable-next-line: max-line-length
            desc : 'Tempor veniam nostrud incididunt duis commodo minim ea consectetur ullamco eiusmod nostrud aliqua proident amet. Non nostrud consectetur consectetur in labore do adipisicing. Velit nostrud consequat sint adipisicing magna nostrud ut sunt elit quis. Sint adipisicing eiusmod culpa voluptate velit nostrud qui consectetur. Aute est adipisicing aliquip non occaecat voluptate minim commodo. Magna laborum aute excepteur occaecat deserunt magna sunt aute est deserunt. Veniam aliquip duis proident cillum.',
            releaseDate : 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) ',
            issueDate : 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) ',
            returnDate: 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) '
    }
  ];

  private selectedBook = new BehaviorSubject<object>({});
  constructor(private router: Router, private modal: NgbModal ) { }

  // tslint:disable-next-line: ban-types
  getReservedBooks(userId: String) {
    return this.books;
  }

  // tslint:disable-next-line: ban-types
   async returnReservedBook(isbn: String) {
    const  user = JSON.parse(localStorage.getItem('user'));
    await fetch('https://library-fccj.herokuapp.com/catalog/release', {
      method: 'POST',
      body: JSON.stringify({
        bookID: '5d80f0eedc51bb67a51cfcaf',
        ownerID: user._id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response);
    });
    // return this.books = [];
  }

  reserveBook(book: object) {
    console.log(book);
    this.selectedBook.next(book);
    this.router.navigate(['reserveBook']);
  }

  getBookToReserve() {
    return this.selectedBook.asObservable();
  }

  async searchBookByISBN(isbn: string) {
    await fetch('https://library-fccj.herokuapp.com/catalog/search', {
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
      console.log('in response');
      console.log(response);
      // this.searchedBook = response;
    });

    console.log(isbn);
    if ( this.searchedBook.length > 0 && this.searchedBook[0].isbn === isbn) {
      this.reserveBook(this.searchedBook);
    } else {
      const modalRef = this.modal.open(NotificationComponent);
      modalRef.componentInstance.option = 'wrong';
      // alert('Book with ISBN not Found.');
    }
  }

  async reserveBookCall(book: object) {
    const diffInMs: number = Date.parse(book[0].returnDate) - Date.parse(book[0].issueDate);
    const days = diffInMs / (1000 * 3600 * 24);
    const  user = JSON.parse(localStorage.getItem('user'));
    await fetch('https://library-fccj.herokuapp.com/catalog/rent', {
      method: 'POST',
      body: JSON.stringify({
        bookID: '5d80f0eedc51bb67a51cfcaf',
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
      this.books.push(book[0]);
      this.router.navigate(['reserveDashboard']);
    });

  }

}
