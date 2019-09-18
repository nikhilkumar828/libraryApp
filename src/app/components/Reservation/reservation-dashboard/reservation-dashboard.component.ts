import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { reservation } from '../reservationsconstants';

@Component({
  selector: 'app-reservation-dashboard',
  templateUrl: './reservation-dashboard.component.html',
  styleUrls: ['./reservation-dashboard.component.css']
})
export class ReservationDashboardComponent implements OnInit {

  public reservation = reservation;
  searchISBN: any = '';
  constructor(private reservationService: ReservationService) { }
  books: any = [];
  ngOnInit() {
    this.books = this.reservationService.getReservedBooks('user1');
    console.log(this.books);
    console.log(reservation.AUTHOR_NAME);
  }

  returnBook(isbn: any) {
    console.log(isbn);
    if (this.books[0].isbn === isbn) {
      this.books = [];
    }
    alert('Book Returned.');
    this.reservationService.returnReservedBook('isbnCode');
  }

  searchBook(isbn: string) {
    console.log(isbn);
    this.reservationService.searchBookByISBN(isbn);
  }

}
