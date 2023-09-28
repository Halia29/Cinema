import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: string | Date): string {
    let inputDate: Date;

    if (typeof value === 'string') {
      inputDate = new Date(value);
    } else if (value instanceof Date) {
      inputDate = value;
    } else {
      return 'Impossible to convert date';
    }

    if(isNaN(inputDate.getDate()) 
    || isNaN(inputDate.getMonth()) 
    || isNaN(inputDate.getFullYear())
    || isNaN(inputDate.getHours())
    || isNaN(inputDate.getMinutes())){
      return 'Impossible to convert date';
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[inputDate.getDay()];

    const formattedDate = `${day} ${inputDate.getDate().toString().padStart(2, '0')}.${(inputDate.getMonth() + 1).toString().padStart(2, '0')} ${inputDate.getHours().toString().padStart(2, '0')}:${inputDate.getUTCMinutes().toString().padStart(2, '0')}`;

    return formattedDate;
  }

}
