import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(inputDate: string | Date): string {
    let inputDateObj: Date;

    if (typeof inputDate === 'string') {
      inputDateObj = new Date(inputDate);
    } else if (inputDate instanceof Date) {
      inputDateObj = inputDate;
    } else {
      return 'Impossible to convert date';
    }
    
    if(isNaN(inputDateObj.getDate()) || isNaN(inputDateObj.getMonth()) || isNaN(inputDateObj.getFullYear())){
      return 'Impossible to convert date';
    }

    const currentDate = new Date();
    
    const isToday = inputDateObj.getDate() === currentDate.getDate() &&
                    inputDateObj.getMonth() === currentDate.getMonth() &&
                    inputDateObj.getFullYear() === currentDate.getFullYear();

    const isTomorrow = inputDateObj.getDate() === currentDate.getDate() + 1 &&
                      inputDateObj.getMonth() === currentDate.getMonth() &&
                      inputDateObj.getFullYear() === currentDate.getFullYear();
    if(isToday) {
      return 'Today';
    }
    else if (isTomorrow) {
      return 'Tomorrow';
    } 
    else {
      const day = inputDateObj.getDate().toString().padStart(2, '0');
      const month = (inputDateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = inputDateObj.getFullYear();
      return `${day}.${month}.${year}`;
    }
  }
}
