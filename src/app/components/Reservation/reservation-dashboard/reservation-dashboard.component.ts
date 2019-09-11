import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-dashboard',
  templateUrl: './reservation-dashboard.component.html',
  styleUrls: ['./reservation-dashboard.component.css']
})
export class ReservationDashboardComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }
  books: any = [];
  ngOnInit() {
    this.books = this.reservationService.getReservedBooks('user1');
    console.log(this.books);
  }

  returnBook(isbn: any) {
    console.log(isbn);
    if (this.books[0].isbn === isbn) {
      this.books = [];
    }
    this.reservationService.getReservedBooks('isbnCode');
  }

}
