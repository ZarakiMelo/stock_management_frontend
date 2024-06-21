// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from '../../components/item-list/item-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
