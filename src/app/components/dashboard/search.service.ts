import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class SearchService {
	searchData: string = '';
	fieldSearch: string = 'isbn';
	booksData = [];
	booksData2019 = [];
	time=null;	
	isLoading:boolean=false;
	isNewData:boolean = false;
	resetData:boolean = false;
	resetResult:boolean =true;
	alertData:boolean =  true;

	constructor() {}


	async getData() {
		this.isLoading=true;
		this.isNewData = true;
		await fetch('https://library-fccj.herokuapp.com/catalog/search', {
			method: 'POST',
			body: JSON.stringify({
			  key: 'year',
			  value: 2019
			}),
			headers: {
			  'Content-type': 'application/json; charset=UTF-8'
			}
		  })
		  .then(res => res.json())
		  .then(data => {
			this.booksData = data;
			this.booksData2019 = data;
		  })
		  this.isLoading=false;
	}

	setData(event:any) {
		this.searchData = event.target.value ;
		if(this.searchData.length>=4)
        {
		this.getSearchData();
		}
		else if(this.searchData.length == 0){
			this.booksData = this.booksData2019;
			this.isNewData = true;
		}
		else{
			this.booksData = [];
		}
		
	}
	 async getSearchData() {
		this.isLoading=true;
		this.isNewData = false;
		this.alertData =true;
		 await fetch('https://library-fccj.herokuapp.com/catalog/search', {
			method: 'POST',
			body: JSON.stringify({
			  key: this.fieldSearch,
			  value: this.searchData
			}),
			headers: {
			  'Content-type': 'application/json; charset=UTF-8'
			}
		  })
		  .then(res => res.json())
		  .then(data => {
			  this.booksData = data;
		  })
		  this.isLoading=false;
	 }
	setField(fieldSearch: string) {
		this.fieldSearch = fieldSearch;
		this.isNewData=true;
		this.resetData = true;
		this.resetResult = true;
		this.alertData = false;
		this.booksData = this.booksData2019;

	}

	resetInput() {
		this.searchData = "";
		this.fieldSearch = "isbn";
	}
}
