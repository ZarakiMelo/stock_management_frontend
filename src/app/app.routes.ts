// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent }
];
