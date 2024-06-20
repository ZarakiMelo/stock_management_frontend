// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { ItemListComponent } from '../../components/item-list/item-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [ItemListComponent] 

})
export class HomeComponent {}
