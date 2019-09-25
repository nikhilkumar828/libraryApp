import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  book_name=[];
  due_days=[];
  user_id='';
  from_date=[];
  start_date=[];
  return_date=[];
  images=[];
  created_date=[];
  total;
  empty='';
  isLoading=true;
  constructor(private notificationService: NotificationService) { 
    this.user_id = (JSON.parse(localStorage.getItem('user'))['_id']);
  }

  ngOnInit() {
    this.isLoading = true;
    fetch('https://library-fccj.herokuapp.com/catalog/rentid/' + this.user_id, {
    method: 'GET',
    headers: {
  'Content-type': 'application/json; charset=UTF-8'
    }
    })
    .then(res =>res.json())
    .then(res =>{
      localStorage.setItem('NotifCount', String(0)) ;
      this.notificationService.setNotificationCount(0);
      for(let index = 0;index < res.length; index++){
        this.book_name.push(res[index].title);
        this.images.push(res[index].image);
        this.created_date.push(res[index].createdDate);
        this.due_days.push(res[index].rentedBy[0].daysToRent);
        console.log('type of created date is ',this.created_date, typeof this.created_date[index]);
        this.from_date.push(res[index].rentedBy[0].startDate.substring(0, 10));
        var temp_return_date = new Date();
        temp_return_date.setDate(new Date(this.from_date[index]).getDate() + this.due_days[index]+1);
        if(new Date(this.from_date[index]).getDate()>temp_return_date.getDate())
        {
          console.log('added to month');
          temp_return_date.setMonth(new Date(this.from_date[index]).getMonth() + 1);
        }
        else{
          console.log('month not changed');
          temp_return_date.setMonth(new Date(this.from_date[index]).getMonth());
        }
        this.return_date.push(String(temp_return_date).substring(0, 15));
        var temp_start_date = new Date();
        temp_start_date.setDate(new Date(this.from_date[index]).getDate() + 1);
        temp_start_date.setMonth(new Date(this.from_date[index]).getMonth());
        this.start_date.push(String(temp_start_date).substring(0, 15));
        this.total = res.length;
      }
      console.log('1. created array is ', this.created_date);
      const _this = this;
      this.start_date.sort(function(a, b){  
        console.log('1.1. created array is ', _this.created_date);
        return _this.created_date.indexOf(a) - _this.created_date.indexOf(b);
      });
      console.log('2. created array is ', _this.created_date);
      this.return_date.sort(function(a, b){  
        return _this.created_date.indexOf(a) - _this.created_date.indexOf(b);
      });
      if(res.length==0){
        this.empty = 'Sorry, No Notifications';
      }
      this.isLoading = false;
    });
    
    }
    
}


