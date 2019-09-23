import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertError } from 'src/app/model/AlertError';
import { ReservationService } from '../../Reservation/reservation.service';
import { SearchService } from '../search.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
	constructor(public rs: ReservationService, public ss: SearchService) {}
	@ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;
	@ViewChild('inputSearch', { static: false }) interval;
  
	fieldSearch: string;
	searchData: string = '';
	booksData = [];
	numberOfElementsInSearch: number = 0;
  	errorData: AlertError;
  	isDisabled: boolean;
	  alertData: AlertError;

	searchFields: string[] = ['title', 'author', 'year', 'Availability' ];
	displayFields: string[] = ['title', 'author' ];
	ngOnInit() {
		this.errorData = new AlertError('alert-danger', 'No books');
		this.alertData = new AlertError('alert-info', 'Enter 4 characters to search');
		this.searchData = this.ss.searchData;
		this.fieldSearch = this.ss.fieldSearch;
    this.ss.getData();
	}
	resetSearch(): void {
		this.inputSearch.nativeElement.value = '';
		this.searchData = '';
		this.ss.setField(this.fieldSearch);
	}
	reserveBook(book) {
		this.rs.reserveBook(book);
  }

  search(event) {
    if(this.interval !== null) {
		console.log("If block: ",this.interval);
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.ss.setData(event);
        clearInterval(this.interval);
      }, 2000);
    }
    else {
		console.log("else block");
      this.ss.setData(event);
    }
  }
  
}