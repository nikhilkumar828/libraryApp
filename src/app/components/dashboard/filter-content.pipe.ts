import { Pipe, PipeTransform } from "@angular/core";
import { Books } from './books';

@Pipe({
  name: "filterContent",
  pure: false
})
export class FilterContentPipe implements PipeTransform {
  constructor(){}
  transform(value: any, filterString: string, propName: string): any {
    if (!value.length || !filterString) return value;
    let resultArray:Books[] = [];
    if(filterString.length>=3){
    for (const item of value) {
      if (item[propName].toString().toLowerCase().startsWith(filterString.toLowerCase())) {
        resultArray.push(item);
      }
    }
  }
 
    return  resultArray;
  }

}