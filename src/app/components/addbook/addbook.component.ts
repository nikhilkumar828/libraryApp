import { AddBookService } from './add-book.service';
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
  isbnPattern = '^[0-9]{13}$';
  unamePattern = '^[a-zA-Z\\s]*$';
  year = '(19[0-8][0-9]|199[0-9]|20[01][0-9]|2020)';
  constructor(private service :AddBookService) { }

  ngOnInit() {
  }

  addBook(bookDetails: any) {
    this.service.addBook(bookDetails,this.imageUrl).then(res => {
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
      this.service.sendEmail();
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
    console.log('outside');

  }
}
