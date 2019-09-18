import { Component, OnInit } from '@angular/core';
import { booksData } from '../books-data';
import { Books } from '../books';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() {}
  fieldSearch:string = 'isbn';
  searchData: string = "";
  booksData:Books[]=booksData;
  title:string = 'Search for your book..';
  searchFields: string[]=['isbn','title','author','releaseDate','availability'];
  ngOnInit() {}
}
