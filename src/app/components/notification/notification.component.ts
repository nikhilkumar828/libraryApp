import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  option='';
  uid = 1;
  book_name=[];
  return_date=[];
  total=[];
  count=-1;
  constructor(public modal: NgbActiveModal,private notification:NotificationService, public router: Router) { }
  
  ngOnInit() {
    if(this.option==''){
      this.router.navigateByUrl('dashboard');
      for(let index = 0; index < this.notification.getData().length; index++ ){
        if(this.uid == this.notification.getData()[index]['uid'])
        { 
          this.book_name.push(this.notification.getData()[index]['book_name']);
          this.return_date.push(this.notification.getData()[index]['return_date']);
          this.total.push(this.count + 1);
        }
      }
    }
  }


}
