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
  myDate: Date=new Date();
  issueMinDate;
  returnMinDate;
  returnMaxDate;
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
setIssueDate(event:any){
this.returnMinDate=event;
this.returnMaxDate=new Date(
  event.getFullYear(),
  event.getMonth(),
  event.getDate()+14
);
this.reservationService.books[0].issueDate=event.getMonth()+1+"/"+event.getDate()+"/"+event.getFullYear();
}

setReturnDate(event:any){
  this.reservationService.books[0].returnDate=event.getMonth()+1+"/"+event.getDate()+"/"+event.getFullYear();
}

reserveBook(isbn:string){
console.log("book reserved");
console.log(this.books)
}

}
