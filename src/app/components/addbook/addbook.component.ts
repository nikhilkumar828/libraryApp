import { Component, OnInit, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { AlertError } from 'src/app/model/AlertError';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  @ViewChild('image', { static: true }) images: ElementRef;
  imageUrl: string;
  success = true;
  message = false;
  displayMessage: true;
  errorData: AlertError;
  isbnPattern = '^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$)[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$';
  unamePattern = '^[a-zA-Z\\s]*$';
  year = '(19[0-8][0-9]|199[0-9]|20[01][0-9]|2020)';
  constructor() { }

  ngOnInit() {
  }

  addBook(bookDetails: any) {
    const book = bookDetails.value;
    fetch('/catalog/additem', {
      method: 'POST',
      body: JSON.stringify({
        title: book.bookName,
        description: book.description,
        image: this.imageUrl,
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
      .then(res => {
        bookDetails.reset();
        this.imageUrl = '';
        this.success = true;
        
      }).catch(() => {
        console.log('error');
      });
    this.errorData = new AlertError('alert-success', 'Added Book Succesfully');
    setTimeout(() => {
      this.errorData = null;
    }, 3000);

  }

  displayImage(image) {
    fetch('/mail', {
      method: 'POST',
      body: JSON.stringify({
        id: 'aman_singh@epam.com',
        subject:'Regarding adding a new book',
        message: '<html>Thank you for adding a new book. <br> Subscribe to weekly updates</html>'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(console.log);
    if (image.target.files[0].size <= 50000) {
      this.message = false;
      if (image.target.files && image.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(image.target.files[0]);
        reader.onload = (im: any) => { this.imageUrl = im.target.result; };
      }
    } else {
      this.message = true;
      this.images.nativeElement.value = '';
      this.imageUrl = '';
    }
  }
}
