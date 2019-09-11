import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservebook',
  templateUrl: './reservebook.component.html',
  styleUrls: ['./reservebook.component.css']
})
export class ReservebookComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }
  books: any = [];
  myDate: Date;
  minDate: Date;
  maxDate: Date;
  ngOnInit() {
    this.myDate = new Date();
    this.minDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth(),
      this.myDate.getDate());
    this.maxDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth() ,
      this.myDate.getDate() + 10);
    this.books = this.reservationService.getReservedBooks('user1');
    console.log(this.books);
  }


}
