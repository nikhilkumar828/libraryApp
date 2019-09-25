import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { reservation } from '../reservationsconstants';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { NotificationComponent } from '../../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-reservation-dashboard',
  templateUrl: './reservation-dashboard.component.html',
  styleUrls: ['./reservation-dashboard.component.css']
})
export class ReservationDashboardComponent implements OnInit {
  public reservation = reservation;
  searchISBN: any = '';
  books: any = [];
  index: number;
  /**
   * Creates an instance of reservation dashboard component.
   * @param reservationService - services for reservation functions
   * @param dialog - to display dialog box
   * @param modal - modal to display confirmation box of ntification module
   */
  constructor(
    private notificationService: NotificationService,
    private reservationService: ReservationService,
    public dialog: MatDialog,
    private modal: NgbModal
  ) {}
  /**
   * on init
   * @description - Makes a call to get reserved books of user .
   */
  ngOnInit() {
    this.reservationService.getReservedBooks();
    this.reservationService.getReservedBooksOfUser().subscribe(bookObj => {
      this.books = bookObj;
    });
  }

  /**
   * Searchs book
   * @param isbn - ISBN number to search the book
   * @description - makes a seach call to get the book with a particular ISBN
   */
  searchBook(isbn: string) {
    this.reservationService.searchBookByISBN(isbn);
  }

  /**
   * Confirmations pop up
   * @param id - book_id
   */
  confirmationPopUp(id: any) {

    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008ACE',
        cancelButtonColor: '#D35D47',
        confirmButtonText: 'Yes, return it!',

      }).then((result) => {
        if (result.value) {
          let total = 0;
          if (this.notificationService.total.getValue() > 0) {
            total = this.notificationService.total.getValue() - 1;
          }
          console.log('in reservation component, at return, total is ', total);
          this.notificationService.setNotificationCount(total);
          this.reservationService.returnReservedBook(id);
          // tslint:disable-next-line: radix
          let notifCount = parseInt(localStorage.getItem('NotifCount'));
          if (notifCount > 0) {
            notifCount = notifCount - 1;
          }
          localStorage.setItem('NotifCount', String(notifCount)) ;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Successfully returned!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  /**
   * Gets return date
   * @param Issuedate - book issue date selected by user when he reserved
   * @param noOfDays - no Of Days user wanted to rent the book
   * @returns  - return date of user by adding noOfDays to issuedate
   */
  getReturnDate(Issuedate: any, noOfDays: number) {
    const date = new Date(Issuedate);
    date.setDate(date.getDate() + noOfDays);
    return date;
  }
}
