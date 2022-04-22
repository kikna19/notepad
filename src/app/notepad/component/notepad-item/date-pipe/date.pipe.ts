import {Injectable, Pipe, PipeTransform} from "@angular/core";


@Pipe({name: 'dateTimeFormat'})

@Injectable()
export class DateTimeFormatPipe implements PipeTransform {
  transform(date: string): any {
    if (date) {
      return date.slice(0,-12)
    }
  }
}
