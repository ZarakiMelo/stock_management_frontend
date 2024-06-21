// src/app/components/item-list/item-list.component.ts
import { Component, OnInit, Input } from '@angular/core';
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
  categories: string[] = ['Toutes les catégories', 'Catégorie 1', 'Catégorie 2', 'Catégorie 3']; // Ajoutez vos catégories ici

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.filter = category === 'Toutes les catégories' ? '' : category;
  }


  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  deleteItem(id: string): void {
    this.itemService.deleteItemById(id).subscribe(() => {
      this.loadItems();
    });
  }
}
