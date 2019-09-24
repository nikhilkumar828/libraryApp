import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class SearchService {
	searchData: string = '';
	booksData = [];
	isLoading:boolean=false;
	newData:boolean = false;
	resetData:boolean = false;
	reset1:boolean =true;
	fieldSearch: string = 'isbn';
	constructor() {}


	async getData() {
		this.isLoading=true;
		this.newData = true;
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
			  console.log(data);
			this.booksData = data;
			  
		  })
		  this.isLoading=false;
	}

	setData(event:any) {
		
		this.searchData = event.target.value ;
		console.log(this.searchData);
		if(this.searchData.length>3){
		this.getSearchData();
		}
		else if(this.searchData.length == 0){
			this.getData();
		}
		else{
			this.booksData = [];
		}
		
	}
	 async getSearchData() {
		this.isLoading=true;
		this.newData = false;
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
			  console.log('received data: ', data)
			  this.booksData = data;
		  })
		  this.isLoading=false;
	 }
	setField(fieldSearch: string) {
		this.fieldSearch = fieldSearch;
		this.newData=true;
		this.resetData = true;
		this.reset1 = true;
		this.getData();

	}

	resetInput() {
		this.searchData = "";
		this.fieldSearch = "isbn";
	}
}
