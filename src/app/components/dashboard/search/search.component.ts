import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { booksData } from '../books-data';
import { Books } from '../books';
import { AlertError } from 'src/app/model/AlertError';
import { ReservationService } from '../../Reservation/reservation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private rs: ReservationService) { }
  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;
  fieldSearch: string = 'ISBN';
  searchData: string = "";
  booksData: Books[] = booksData;
  numberOfElementsInSearch: number = 0;
  errorData: AlertError;

  searchFields: string[] = ['ISBN', 'Title', 'Author', 'Release Year', 'Availability'];
  displayFields: string[] = ['ISBN', 'Title', 'Author'];
  ngOnInit() {
    this.errorData = new AlertError("alert-danger", "No books");
  }
  resetSearch(): void {
    this.inputSearch.nativeElement.value = '';
    this.searchData = '';
  }
  reserveBook(book){
    this.rs.reserveBook(book);
  }
}
