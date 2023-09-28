import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'Impossible to convert date';
    const date = new Date(value);
    
    
    if(isNaN(date.getHours())
    || isNaN(date.getMinutes())){
      return 'Impossible to convert date';
    }
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }
}
