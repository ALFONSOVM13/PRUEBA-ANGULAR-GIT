import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
  standalone: true
})
export class UniquePipe implements PipeTransform {
  transform(items: any[], property: string): any[] {
    if (!items) return [];
    return [...new Set(items.map(item => item[property]))];
  }
}
