import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateMoment'
})
export class DateMomentPipe implements PipeTransform {

  transform(date: Date | string, format: string = 'DD-MM-YYYY'): string {
    moment.locale('es');
    const momentDate: moment.Moment = typeof date === 'string' ? moment(date, "DD-MM-YYYY") : moment(date);  // if orginal type was a string    
    return momentDate.format(format);
  }

}
