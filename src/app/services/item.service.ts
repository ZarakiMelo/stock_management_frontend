import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/items'; // Assurez-vous que l'URL correspond à votre API

  // Utilisation d'un BehaviorSubject pour stocker la liste d'articles
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadItems();
  }

  /**
   * Charge les articles depuis l'API et met à jour le BehaviorSubject.
   */
  private loadItems(): void {
    this.http.get<Item[]>(this.apiUrl).subscribe(items => {
      this.itemsSubject.next(items);
    });
  }

  /**
   * Ajoute un nouvel article en utilisant une requête POST à l'API.
   * @param item - L'article à ajouter.
   * @returns Un Observable contenant le nouvel article ajouté.
   */
  addItem(item: Item): Observable<Item> {
    item._id = undefined; 
    return this.http.post<Item>(this.apiUrl, item).pipe(
      tap((newItem: Item) => {
        this.itemsSubject.next([...this.itemsSubject.value, newItem]);
      })
    );
  }

  /**
   * Supprime un article par son identifiant en utilisant une requête DELETE à l'API.
   * @param id - L'identifiant de l'article à supprimer.
   * @returns Un Observable qui se complète lorsque l'article est supprimé.
   */
  deleteItemById(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        const updatedItems = this.itemsSubject.value.filter(item => item._id !== id);
        this.itemsSubject.next(updatedItems);
      })
    );
  }
}
