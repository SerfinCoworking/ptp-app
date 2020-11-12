import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    console.log(value.charAt(0), value, "firstLetter pipe");

    if (!value) { return ''; }
    return value.charAt(0).toUpperCase();
  }

}
