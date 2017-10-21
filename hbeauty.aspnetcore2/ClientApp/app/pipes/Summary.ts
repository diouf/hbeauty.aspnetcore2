import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'summary'})
export class Summary implements PipeTransform {
  transform(value: string, maxLength: number): any {
    if (!value) return value;

    value = value.substring(0,maxLength)+'...'

    return value;
  }
}