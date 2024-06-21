// src/app/components/item-form/item-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent {
  @Output() itemAdded = new EventEmitter<Item>();
  @Output() cancel = new EventEmitter<void>();

  newItem: Item = {
    name: '',
    category: '',
    size: '',
    color: '',
    quantity: 0,
    price: 0
  };

  constructor(private itemService: ItemService) {}

  addItem(): void {
    console.log('Form submitted'); // Ajoutez ceci pour vérifier si la méthode est appelée
    this.itemService.addItem(this.newItem).subscribe(item => {
      console.log('Item added:', item); // Ajoutez ceci pour vérifier la réponse de l'API
      this.itemAdded.emit(item);
      this.resetForm();
    });
  }
  

  resetForm(): void {
    this.newItem = {
      name: '',
      category: '',
      size: '',
      color: '',
      quantity: 0,
      price: 0
    };
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
