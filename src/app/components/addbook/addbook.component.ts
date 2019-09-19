import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  addBook(bookDetails:any){
    
    let book = bookDetails.value;
    fetch('/catalog/additem', {
      method: 'POST',
      body: JSON.stringify({
        title: book.booktitle,
        isbn: book.ISBN,
        author: book.author,
        publisher: "Epam publications",
        category: 'CSE',
        year: new Date(bookDetails.value.relDate).getFullYear()
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(console.log)
    
  }
}
