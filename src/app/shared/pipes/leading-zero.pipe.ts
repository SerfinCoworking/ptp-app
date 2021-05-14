import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZero'
})
export class LeadingZeroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const padChar = args[1] || '0';
    const size: number = (args[0] || 1) as number;
    return (String(padChar).repeat(size) + value).substr(size * -1, size);
  }

}
