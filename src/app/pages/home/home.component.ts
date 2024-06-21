
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { ItemFormComponent } from '../../components/item-form/item-form.component';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [ItemListComponent, ItemFormComponent, CommonModule],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showForm: boolean = false; // Indicateur pour afficher ou masquer le formulaire d'ajout d'article
  items: Item[] = []; // Liste des articles à afficher

  /**
   * Constructeur de HomeComponent.
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
   * Bascule l'affichage du formulaire d'ajout d'article.
   */
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  /**
   * Gestionnaire de l'événement d'ajout d'un article.
   * @param item - L'article qui a été ajouté.
   */
  handleItemAdded(item: Item): void {
    this.toggleForm();
  }

  /**
   * Annule l'ajout d'article et cache le formulaire.
   */
  cancelForm(): void {
    this.toggleForm();
  }
}
