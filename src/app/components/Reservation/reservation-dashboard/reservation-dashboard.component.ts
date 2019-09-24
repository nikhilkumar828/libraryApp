import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { reservation } from '../reservationsconstants';
import { MatDialog } from '@angular/material';
import { NotificationComponent } from '../../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-reservation-dashboard',
  templateUrl: './reservation-dashboard.component.html',
  styleUrls: ['./reservation-dashboard.component.css']
})
export class ReservationDashboardComponent implements OnInit {

  public reservation = reservation;
  searchISBN: any = '';
  constructor(private reservationService: ReservationService , public dialog: MatDialog , private modal: NgbModal) { }
  books: any = [];
  index: number ;
  ngOnInit() {
    this.reservationService.getReservedBooks();
    this.reservationService.getReservedBooksOfUser().subscribe( (bookObj) => {
      this.books = bookObj;
    });
  }


  searchBook(isbn: string) {
    this.reservationService.searchBookByISBN(isbn);
  }

  confirmationPopUp(id: any) {
      const modalRef = this.modal.open(NotificationComponent, { centered: true });
      modalRef.componentInstance.option = id;
  }

  getReturnDate( Issuedate: any , noOfDays: number) {
    const date = new Date(Issuedate);
    date.setDate( date.getDate() + noOfDays );
    return date;
  }

}
