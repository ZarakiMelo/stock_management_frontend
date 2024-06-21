// src/app/pages/home/home.component.ts
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
  showForm: boolean = false;
  items: Item[] = [];


  constructor(private itemService: ItemService) {}
  ngOnInit(): void {
    this.itemService.items$.subscribe(items => {
      this.items = items;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

 
  handleItemAdded(item: Item): void { 
    /*this.itemService.addItem(item).subscribe(() => {
       // Cache le formulaire après ajout réussi
    });*/
    this.toggleForm();
  }

  cancelForm(): void {
    this.toggleForm();
  }
}