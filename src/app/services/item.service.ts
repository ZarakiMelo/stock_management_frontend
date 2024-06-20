import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://api.example.com/items'; // Exemple d'URL de l'API, à adapter

  constructor(private http: HttpClient) {}

  // Récupérer tous les items
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}`);
  }

  // Récupérer un item par son ID
  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un item
  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }

  // Ajouter un nouvel item
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}`, item);
  }

  // Supprimer un item par son ID
  deleteItemById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
