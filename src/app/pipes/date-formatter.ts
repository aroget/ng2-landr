import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({name: 'dateFormatter'})
export class DateFormatterPipe implements PipeTransform {
  transform(date: string, format: string): string {
    var date = date;
    return moment(date).format(format);
  }
}

@Pipe({name: 'dateFormatterFromNow'})
export class DateFormatterFromNowPipe implements PipeTransform {
  transform(date: string): string {
    var date = date;
    return moment(date, "YYYYMMDD").startOf('day').fromNow();
  }
}