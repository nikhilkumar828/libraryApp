import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  constructor() { }

  async addBook(bookDetails, imageUrl) {
    const book = bookDetails.value;
    await fetch('https://library-fccj.herokuapp.com/catalog/additem', {
      method: 'POST',
      body: JSON.stringify({
        title: book.bookName,
        description: book.description,
        image: imageUrl,
        isbn: book.ISBN,
        author: book.author,
        publisher: book.publication,
        category: book.category,
        year: book.relDate,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      
  }
  async sendEmail() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("in service")
    await fetch('https://library-fccj.herokuapp.com/mail', {
      method: 'POST',
      body: JSON.stringify({
        id: user._id,
        subject: 'Successfully Added a Book',
        message: '<html>,<br>Thank you for adding  a book.<br> Thank you.</html>'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => {
        res.json();
        console.log(res.json());
      });

  }
}
