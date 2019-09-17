import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { reservation } from '../reservationsconstants';

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

  constructor(private reservationService: ReservationService) { }
  ngOnInit() {
    this.issueMinDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth(),
      this.myDate.getDate());
    this.returnMinDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth(),
      this.myDate.getDate());
    this.books = this.reservationService.getReservedBooks('user1');

  }
  setIssueDate(event: any) {
    this.returnMinDate = event;
    console.log(event);
    this.returnMaxDate = new Date(
      event.getFullYear(),
      event.getMonth(),
      event.getDate() + 14
    );
    this.returnDate = '';
    this.reservationService.books[0].issueDate = event.getMonth() + 1 + '/' + event.getDate() + '/' + event.getFullYear();
  }

  setReturnDate(event: any) {
    this.reservationService.books[0].returnDate = event.getMonth() + 1 + '/' + event.getDate() + '/' + event.getFullYear();
  }

  reserveBook(isbn: string) {
    console.log(this.books);
  }

}
