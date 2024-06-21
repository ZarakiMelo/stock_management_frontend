// src/app/components/item-list/item-list.component.ts
import { Component, OnInit} from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemFilterPipe } from '../../pipes/item-filter.pipe';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,ItemFilterPipe],
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filter: string = '';
  categories: string[] = ['Toutes les catégories', 'Rouleau', 'Chemise', 'Pull'];

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.filter = category === 'Toutes les catégories' ? '' : category;
  }


  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.items$.subscribe(items => {
      this.items = items;
    });
  }

  deleteItem(id: string): void {
    this.itemService.deleteItemById(id).subscribe(() => {
      // La liste est mise à jour automatiquement via l'Observable items$
    });
  }
}