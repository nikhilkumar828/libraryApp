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
  myDate: Date = new Date();
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
    this.reservationService.getBookToReserve().subscribe(bookObj => {
      this.books.push(bookObj);
    });
    this.issueMinDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth(),
      this.myDate.getDate()
    );
    this.returnMinDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth(),
      this.myDate.getDate()
    );
  }

  /**
   * Sets issue date
   * @param event - selected issuedate
   * @description - takes  the selected issue date and calculates validation for return date and sets its issue date
   */
  setIssueDate(event: any) {
    this.returnMinDate = event;

    this.returnMaxDate = new Date(
      event.getFullYear(),
      event.getMonth(),
      event.getDate() + 14
    );
    this.returnDate = '';
    this.books[0].issueDate = event;
  }

  /**
   * Sets return date
   * @param event - selected returndate
   * @description - sets the return date of the book
   */
  setReturnDate(event: any) {
    // this.reservationService.books[0].returnDate = event.getMonth() + 1 + '/' + event.getDate() + '/' + event.getFullYear();
    this.books[0].returnDate = event;
  }

  /**
   * Reserves book
   * @description - service call to reserve the book
   */
  reserveBook() {
    this.reservationService.reserveBookCall(this.books);
  }
}
