import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'weekdayNames'
})
export class WeekdayNamesPipe implements PipeTransform {

  transform(weekdayNumbers: [number], args?: any): any {

    moment.locale('he');
    return weekdayNumbers.map(number => moment.weekdays(number));
  }

}
