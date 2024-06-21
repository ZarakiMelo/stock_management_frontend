import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'itemFilter',
  standalone: true
})
export class ItemFilterPipe implements PipeTransform {
  transform(items: Item[], filter: string): Item[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
  }
}
