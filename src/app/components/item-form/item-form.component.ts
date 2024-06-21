
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
  @Output() itemAdded = new EventEmitter<Item>(); // Événement émis lors de l'ajout d'un article
  @Output() cancel = new EventEmitter<void>(); // Événement émis lors de l'annulation du formulaire

  newItem: Item = {
    name: '',
    category: '',
    size: '',
    color: '',
    quantity: 0,
    price: 0
  };

  /**
   * Constructeur de ItemFormComponent.
   * @param itemService - Service pour gérer les opérations sur les articles.
   */
  constructor(private itemService: ItemService) {}

  /**
   * Méthode pour ajouter un nouvel article.
   * Émet un événement itemAdded avec l'article ajouté et réinitialise le formulaire.
   */
  addItem(): void {
    console.log('Form submitted'); // Log pour vérifier l'appel de la méthode
    this.itemService.addItem(this.newItem).subscribe(item => {
      console.log('Item added:', item); // Log pour vérifier la réponse de l'API
      this.itemAdded.emit(item);
      this.resetForm();
    });
  }

  /**
   * Réinitialise le formulaire en vidant les champs.
   */
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

  /**
   * Méthode pour gérer l'annulation du formulaire.
   * Émet un événement cancel.
   */
  onCancel(): void {
    this.cancel.emit();
  }
}
