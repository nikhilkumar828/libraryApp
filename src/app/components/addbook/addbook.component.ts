import { Component, OnInit, ViewChild, ElementRef, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  imageUrl: any;
  constructor() { }

  ngOnInit() {
  }

  addBook(bookDetails: any) {

    let book = bookDetails.value;
    console.log(book.bookName);

    fetch('https://library-fccj.herokuapp.com/catalog/additem',{
      method: 'POST',
      body: JSON.stringify({
        title: book.bookName,
        description: book.description,
        image: this.imageUrl,
        isbn: book.ISBN,
        author:  book.author,
        publisher: 'Manning',
        category: 'IT',
        year: book.relDate,
      }),
      headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
    })
    .then(res => res.json())
    .then(console.log)

    // fetch('https://library-fccj.herokuapp.com/catalog/additem', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: book.booktitle,
    //     description:book.description,
    //     image:this.imageUrl,
    //     isbn: book.ISBN,
    //     author: book.author,
    //     publisher: "Epam publications",
    //     category: 'CSE',
    //     year: book.relDate
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8'
    //   }
    // })
    // .then(res => res.json())
    // .then(console.log)
  }

displayImage(image){
  if (image.target.files && image.target.files[0]) {
    console.log(image.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(image.target.files[0]);
    reader.onload = (image: any) => { this.imageUrl = image.target.result; };
  }

}
}
