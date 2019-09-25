import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RouterLink, Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  books = [];
  index: any;
  searchedBook = [];
  private selectedBook = new BehaviorSubject<object>({});
  private userBooks = new BehaviorSubject<object>({});

  constructor(private router: Router, private modal: NgbModal) {}

  /**
   * Gets reserved books
   * @description - To get reserved books of the user
   */
  async getReservedBooks() {
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch(
      'https://library-fccj.herokuapp.com/catalog/rentid/' + user._id,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
    )
      .then(res => res.json())
      .then(response => {
        let userIndex = 0;
        if (response.length !== 0) {
          for (const element of response) {
            userIndex = this.getIndexOfUser(element);
            element.currentUserIndex = userIndex;
          }
        }
        this.userBooks.next(response);
      });
  }

  /**
   * Gets index of user
   * @param response - book object
   * @returns  - current user index
   * @description - In the book object it searches for the index of the user in the rentedBy column.
   */
  getIndexOfUser(response) {
    this.index = 0;
    const user = JSON.parse(localStorage.getItem('user'));
    for (const element of response.rentedBy) {
      if (element.ownerID !== user._id) {
        this.index++;
      } else {
        break;
      }
    }
    return this.index;
  }
  /**
   * Gets reserved books of user
   * @returns  - observable of userBooks to be able to subscribe
   */
  getReservedBooksOfUser() {
    return this.userBooks.asObservable();
  }

  /**
   * Returns reserved book
   * @param id - book ID
   * @description - api call to return the reserved book
   */
  async returnReservedBook(id: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch('https://library-fccj.herokuapp.com/catalog/release', {
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
      .then(response => {});
    this.getReservedBooks();
  }

  /**
   * Reserves book
   * @param book - book object
   * @description - from dashboard when user clicks reserve on a particular book it sends the book object and navigates to reserveBook page
   */
  reserveBook(book: object) {
    this.selectedBook.next(book);
    // this.router.navigate(['reserveBook']);
  }

  /**
   * Gets reserved books of user
   * @returns  - observable of selectedBooks to be able to subscribe
   */
  getBookToReserve() {
    return this.selectedBook.asObservable();
  }

  /**
   * Searchs book by isbn
   * @param isbn - isbn user entered
   * @description -  API call to search the book with ISBN
   */
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
      .then(response => {
        this.searchedBook = response;
      });

    if (this.searchedBook.length > 0 && this.searchedBook[0].isbn === isbn) {
      if (this.searchedBook[0].quantity - this.searchedBook[0].rentedCount) {
        this.reserveBook(this.searchedBook[0]);
      } else {
        const modalRef = this.modal.open(NotificationComponent, {
          centered: true
        });
        modalRef.componentInstance.option = 'already';
      }
    } else {
      const modalRef = this.modal.open(NotificationComponent, {
        centered: true
      });
      modalRef.componentInstance.option = 'wrong';
    }
  }

  /**
   * Reserves book call
   * @param book - book object
   * @description - API call to reserve the book
   */
  async reserveBookCall(book: object) {
    const diffInMs: number =
      Date.parse(book[0].returnDate) - Date.parse(book[0].issueDate);
    const days = diffInMs / (1000 * 3600 * 24);
    const user = JSON.parse(localStorage.getItem('user'));
    let reserved = false;
    const rentedUsers = book[0].rentedBy;
    rentedUsers.forEach(element => {
      if (element.ownerID === user._id) {
        reserved = true;
      }
    });
    if (!reserved) {
      await fetch('https://library-fccj.herokuapp.com/catalog/rent', {
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
        .then(response => {
          const modalRef = this.modal.open(NotificationComponent, {
            centered: true
          });
          modalRef.componentInstance.option = 'reserve';
          this.router.navigate(['reserveDashboard']);
          this.sendEmail(book);
        });
    } else {
      const modalRef = this.modal.open(NotificationComponent, {
        centered: true
      });
      modalRef.componentInstance.option = 'reservedBySameUser';
    }
  }

  /**
   * Sends email
   * @param books - book object
   * @description - sends email to user on reservation of a book
   */
  async sendEmail(books: any) {
    let mockBookString:string="";
    let mockBook:any = [{title:'In Search of Lost Time'},
                        {title:'Ulysses'},
                        {title:'The Great Gatsby'},
                        {title:'Don Quixote'}];
    for(let book of mockBook ){
      mockBookString=mockBookString+"\n"+book.title;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch('https://library-fccj.herokuapp.com/mail', {
      method: 'POST',
      body: JSON.stringify({
        id: user._id,
        subject: 'Successfully Reserved Book(s)',
        // tslint:disable-next-line: max-line-length
         message:
          '<html>,<br>Thank you for using EPAM Library. You have successfully reserved the following book(s):-<br>'+mockBookString+'<br>Thank You.'
     }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => res.json());
  }
}
