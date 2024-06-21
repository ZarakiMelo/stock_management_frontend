import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'itemFilter',
  standalone: true
})
export class ItemFilterPipe implements PipeTransform {
  /**
   * Transforme un tableau d'articles en filtrant ceux qui correspondent à une catégorie spécifique.
   * @param items - Le tableau d'articles à filtrer.
   * @param filter - La chaîne de filtre pour la catégorie.
   * @returns Un tableau d'articles filtrés.
   */
  transform(items: Item[], filter: string): Item[] {
    if (!items || !filter) {
      return items; // Retourne tous les articles si aucun filtre n'est fourni
    }
    return items.filter(item => item.category.toLowerCase().includes(filter.toLowerCase()));
  }
}
