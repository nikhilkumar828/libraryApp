import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { reservation } from '../reservationsconstants';
import { NotificationComponent } from '../../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservebook',
  templateUrl: './reservebook.component.html',
  styleUrls: ['./reservebook.component.css']
})
export class ReservebookComponent implements OnInit {
  public reservation = reservation;
  books: any = [];
  myDate: string;
  presentDate: Date =  new Date();
  issueMinDate: Date;
  returnMinDate: Date;
  returnMaxDate: Date;
  returnDate = '';
  issueDate = '';

  /**
   * Creates an instance of reservebook component.
   * @param reservationService - Services used for reservations
   */
  constructor(private reservationService: ReservationService) {}

  /**
   * on init
   * @description - used to subscribe to the book user want to reserve and setting the min issue and return date
   */
  ngOnInit() {
    this.reservationService.getBookToReserve().subscribe(booksObj => {
      this.books = booksObj;
    });
    if (this.books.length) {
    this.myDate = this.presentDate.toLocaleDateString();
    for (const book of this.books) {
      book.issueDate = this.presentDate;
    }
    this.returnMinDate = new Date(
      this.presentDate.getFullYear(),
      this.presentDate.getMonth(),
      this.presentDate.getDate()
    );
    this.returnMaxDate = new Date(
      this.presentDate.getFullYear(),
      this.presentDate.getMonth(),
      this.presentDate.getDate() + 14
    );
    }
  }



  /**
   * Sets return date
   * @param event - selected returndate
   * @description - sets the return date of the book
   */
  setReturnDate(event: any, index) {
    // this.reservationService.books[0].returnDate = event.getMonth() + 1 + '/' + event.getDate() + '/' + event.getFullYear();
    for (const book of this.books) {
      book.returnDate = event;
    }
  }

  /**
   * Reserves book
   * @description - service call to reserve the book
   */
  reserveBook() {
    this.reservationService.reserveBookCall(this.books);
  }

  removeBook(i) {
    this.books.splice(i, 1);
  }
}
