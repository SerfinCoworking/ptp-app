import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if(!value) return "";
    moment.locale("es");
    const dateFrom = moment(value);
    // console.log(args, "argumentos");
    return dateFrom.format(args[0]);
  }

}
