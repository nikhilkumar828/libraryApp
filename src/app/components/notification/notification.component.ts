import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {

  option='';
  uid = 1;
  book_name=[];
  due_days=[];
  return_date=[];
  start_date=[];
  total=0;
  count=-1;
  name ;
  customString='';
  user_id='';
  empty=true;
  
  constructor(public modal: NgbActiveModal,private notificationService:NotificationService, public router: Router) {
    this.user_id = (JSON.parse(localStorage.getItem('user'))['_id']);
   }
  
  ngOnInit() {

    if(this.option=='return'){
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'The book has been successfully returned',
        showConfirmButton: false,
        timer: 1500,
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='already'){
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Sorry, the reservations for this book is full.',
        showConfirmButton: false,
        timer: 1500,
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='reserve'){
      this.total=this.notificationService.total.getValue() + 1;
      console.log('in notification component, at reserve, total is ', this.total);
      this.notificationService.setNotificationCount(this.total);
      let notifCount = parseInt(localStorage.getItem('NotifCount'))
      notifCount = notifCount + 1;
      localStorage.setItem('NotifCount', String(notifCount)) ;
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Successfully reserved!',
        showConfirmButton: false,
        timer: 1500,
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='wrong'){
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Wrong ISBN number',
        showConfirmButton: false,
        timer: 1500,
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='reservedBySameUser'){
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'You already have this book!',
        showConfirmButton: false,
        timer: 1500,
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='already'){
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'You already have this book!',
        showConfirmButton: false,
        timer: 1500,
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='login'){
      this.router.navigateByUrl('dashboard');
      fetch('https://library-fccj.herokuapp.com/catalog/rentid/' + this.user_id, {
            method: 'GET',
            headers: {
          'Content-type': 'application/json; charset=UTF-8'
            }
            })
            .then(res =>res.json())
            .then(res =>{
              this.name = (JSON.parse(localStorage.getItem('user'))['firstName'])
              for(let index = 0;index < res.length; index++){
                this.book_name.push(res[index].title);
                this.due_days.push(res[index].rentedBy[0].daysToRent);
                this.start_date.push(res[index].rentedBy[0].startDate.substring(0, 10));
                var tempdate = new Date();
                console.log('start_dates are: ',this.start_date);
                tempdate.setDate(new Date(this.start_date[index]).getDate() + this.due_days[index]);
                this.return_date.push(String(tempdate).substring(0, 15));
              }
                this.total = res.length;
                console.log('res.length is ', res.length);
                console.log('total is ', this.total);
                localStorage.setItem('NotifCount', String(this.total)) ;
                if(this.total!=0){
                  this.notificationService.setNotificationCount(this.total);
                  this.name = (JSON.parse(localStorage.getItem('user'))['firstName']);
                  
                  Swal.fire({
                    width: 200,
                    position: "bottom-right",
                    backdrop: 'rgba(0,0,0,0)',
                    padding: 0,
                    title: 'Hello ' + this.name,
                    timer: 3000,
                    confirmButtonText: 'You have some notifications!',
                    confirmButtonColor: '#008ACE',
                    onClose: () => {
                      console.log('closed :)');
                      this.modal.close('Ok click')
                    }
                  }).then((result) => {
                    if (result.value) {
                      this.router.navigateByUrl('notification');
                    }
                  })
                }
                else{
                  this.notificationService.setNotificationCount(0);
                  this.modal.close('Ok click');
                }
            }); 

    }

  }
}