// src/app/components/item-list/item-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemFilterPipe } from '../../pipes/item-filter.pipe';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemFilterPipe],
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = []; // Liste des articles à afficher
  filter: string = ''; // Filtre pour les articles
  categories: string[] = ['Toutes les catégories', 'Rouleau', 'Chemise', 'Pull']; // Catégories d'articles disponibles

  /**
   * Constructeur de ItemListComponent.
   * @param itemService - Service pour gérer les opérations sur les articles.
   */
  constructor(private itemService: ItemService) {}

  /**
   * Initialisation du composant.
   * Chargement des articles depuis le service lors de l'initialisation.
   */
  ngOnInit(): void {
    this.itemService.items$.subscribe(items => {
      this.items = items;
    });
  }

  /**
   * Gère le changement de catégorie dans le filtre.
   * @param event - Événement de changement de la sélection de catégorie.
   */
  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.filter = category === 'Toutes les catégories' ? '' : category;
  }

  /**
   * Supprime un article par son ID.
   * @param id - ID de l'article à supprimer.
   */
  deleteItem(id: string): void {
    this.itemService.deleteItemById(id).subscribe(() => {
      // La liste des articles sera mise à jour automatiquement grâce à l'observable items$ dans itemService.
    });
  }
}
