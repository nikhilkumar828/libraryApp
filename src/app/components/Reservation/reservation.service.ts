import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

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
            releaseDate : '12/09/2018',
            issueDate : '13/09/2019',
            returnDate: '16/09/2019'
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
            releaseDate : '12/09/2018',
            issueDate : '13/09/2019',
            returnDate: '16/09/2019'
          }
  ];

  private selectedBook = new BehaviorSubject<object>({});
  constructor(private router: Router) { }

  // tslint:disable-next-line: ban-types
  getReservedBooks(userId: String) {
    return this.books;
  }

  // tslint:disable-next-line: ban-types
  returnReservedBook(isbn: String) {
    return this.books = [];
  }

  reserveBook(book: object) {
    console.log(book);
    this.selectedBook.next(book);
    this.router.navigate(['reserveBook']);
  }

  getBookToReserve() {
    return this.selectedBook.asObservable();
  }

  searchBookByISBN(isbn: string) {
    console.log(isbn);
    if ( this.searchedBook.length > 0) {
      this.reserveBook(this.searchedBook);
    } else {
      alert('Book with ISBN not Found.');
    }
  }

  reserveBookCall(book: object) {
    console.log(book);
    this.books.push(book[0]);
    this.router.navigate(['reserveDashboard']);
  }

}
