import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'upcomingToLatest'
})
export class UpcomingToLatestPipe implements PipeTransform {
  transform(array: any, fieldName: any): any {
    if (array && array.length && array[0][fieldName]) {
      const now: Date = new Date();

      array.sort((a: any, b: any) => {
        const date1: Date = new Date(a[fieldName]);
        const date2: Date = new Date(b[fieldName]);

        // If the first date passed
        if (date1 < now) {
          // If the second date passed
          if (date2 < now) {
            return 0;
          } else {
            return 1;
          }
        } else {
          // If the second date passed
          if (date2 < now) {
            return -1;
          } else if (date1 < date2) {
            return -1;
          } else if (date1 > date2) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    }

    return array;
  }
}
