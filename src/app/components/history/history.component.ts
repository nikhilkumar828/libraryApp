import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  book_name=[];
  due_days=[];
  user_id='';
  start_date=[];
  return_date=[];
  images=[]
  total;
  empty='';
  constructor() { 
    this.user_id = (JSON.parse(localStorage.getItem('user'))['_id']);
  }

  ngOnInit() {
    fetch('/catalog/rentid/' + this.user_id, {
    method: 'GET',
    headers: {
  'Content-type': 'application/json; charset=UTF-8'
    }
    })
    .then(res =>res.json())
    .then(res =>{
      for(let index = 0;index < res.length; index++){
        this.book_name.push(res[index].title);
        this.images.push(res[index].image);
        this.due_days.push(res[index].rentedBy[0].daysToRent);
        this.start_date.push(res[index].rentedBy[0].startDate.substring(0, 10));
        var tempdate = new Date();
        console.log('1: ', this.start_date);
        console.log('2: ', ((this.start_date[index])));
        tempdate.setDate(new Date(this.start_date[index]).getDate() + this.due_days[index]);
        this.return_date.push(String(tempdate).substring(0, 15));
        console.log(this.start_date, this.due_days);
        console.log(this.return_date);
        this.total = res.length;
        console.log(this.total);
      }
      if(res.length==0){
        console.log('total is 0');
        this.empty = 'Sorry, No Notifications';
      }
    });
    
    }
    
}


