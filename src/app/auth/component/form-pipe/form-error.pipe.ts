import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'error'})
export class FormErrorPipe implements PipeTransform {
  transform(value: string): any {
    if (value) {
      return value.toString().slice(25)
    }
    return null;
  }
}
