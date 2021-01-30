import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardFormat'
})
export class CardFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/\d{4}(?=.)/g, '$& ');;
  }

}
