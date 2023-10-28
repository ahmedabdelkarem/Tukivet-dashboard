import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    const timeParts = value.split(':');
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const seconds = timeParts[2].split('.')[0];
    return `${hours}:${minutes}:${seconds}`;
  }
}
